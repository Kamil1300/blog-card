// components/PostPage.tsx (Client Component)
"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Header } from '@/components/header';
import { ConfirmationModal } from '@/components/confirmationModal';
import { ModeToggle } from '@/components/toggle';
import axios from 'axios';

const PostPage = ({ post }: { post: { id: string, title: string, content: string } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
      router.push('/home');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      <div className="lg:mx-20 mx-8">
        <ModeToggle />
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

export default PostPage;
