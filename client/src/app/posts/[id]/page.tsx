"use client"; // Add this to mark the component as a Client Component

import { useRouter } from 'next/navigation'; // Update import
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { ConfirmationModal } from '@/components/confirmationModal';
import { ModeToggle } from '@/components/toggle';

const PostPage = ({ postId }: { postId: string }) => {
  const [post, setPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

 const handleEdit = () => {
  const queryParams = new URLSearchParams({
    id: post.id,
    title: post.title,
    content: post.content,
  }).toString();

  router.push(`/createPost?${queryParams}`);
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
      <Header />
      <div className="lg:mx-20 mx-8">
      <ModeToggle/>
      </div>
      <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className='text-5xl sm:text-6xl font-bold text-center'>
            {post.title}
          </div>
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 dark:text-white sm:text-2xl sm:leading-9">
              <p>
                “{post.content}”
              </p>
            </blockquote>
            <div className="mt-6 flex items-center justify-center space-x-3 text-base">
              <Button onClick={handleEdit} className='hover:bg-gray-600 dark:hover:bg-gray-300'>Edit</Button>
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

export default async function PostPageWrapper({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Pass postId as a prop to PostPage
  return <PostPage postId={id} />;
}
