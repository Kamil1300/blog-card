import { GetServerSideProps } from 'next';
import axios from 'axios';
import '@/app/globals.css';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Header } from '@/components/header';
import { ConfirmationModal } from '@/components/ConfirmationModal';

const PostPage = ({ post }: { post: any }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    router.push({
      pathname: '/createPost',
      query: { id: post.id, title: post.title, content: post.content },
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/posts/${post.id}`);
      router.push('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  if (!post) return <p>Post not found</p>;

  return (
    <>
      <Header/>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className='text-5xl sm:text-6xl font-bold text-center'>
            {post.title}
          </div>
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “{post.content}”
              </p>
            </blockquote>
            <div className="mt-6 flex items-center justify-center space-x-3 text-base">
              <Button onClick={handleEdit} className='hover:bg-gray-600'>Edit</Button>
              <Button onClick={handleModalOpen} className='bg-red-600 hover:bg-red-500'>Delete</Button>
            </div>
          </figure>
        </div>
      </section>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this post?"
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const response = await axios.get(`http://localhost:3001/posts/${id}`);
    return { props: { post: response.data } };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { props: { post: null } };
  }
};

export default PostPage;