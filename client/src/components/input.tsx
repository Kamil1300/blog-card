'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export function InputWithButton() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const router = useRouter();
  const searchParams : any = useSearchParams();

  useEffect(() => {
    const postId = searchParams.get('id');
    const postTitle = searchParams.get('title');
    const postContent = searchParams.get('content');

    if (postId && postTitle && postContent) {
      setTitle(postTitle);
      setContent(postContent);
    }
  }, [searchParams]);

  const handlePost = async () => {
    setErrors({});

    let valid = true;
    const newErrors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title should not be empty";
      valid = false;
    }

    if (!content.trim()) {
      newErrors.content = "Content should not be empty";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const postId = searchParams.get('id');
      if (postId) {
        // If editing an existing post
        await axios.put(`http://localhost:3001/posts/${postId}`, {
          title,
          content
        });
        router.push(`/posts/${postId}`);
      } else {
        // If creating a new post
        await axios.post('http://localhost:3001/posts', {
          title,
          content
        });
      }

      setTitle('');
      setContent('');
      router.push('/home');
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-sm items-center space-x-2">
      <Input className="dark:border-slate-400" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      {errors.title && <p className="text-red-500">{errors.title}</p>}
      <Textarea className="dark:border-slate-400" placeholder="Write here" value={content} onChange={(e) => setContent(e.target.value)} required />
      {errors.content && <p className="text-red-500">{errors.content}</p>}
      <Button type="submit" onClick={handlePost}>{searchParams.get('id') ? 'Update' : 'Add'}</Button>
    </div>
  );
}
