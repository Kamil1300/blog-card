// app/post/[id]/page.tsx (Server Component)
import { useRouter } from 'next/navigation';
import PostPage from '@/components/postPage';

export default async function PostPageWrapper({ params }: { params: { id: string } }) {
  const { id } = params;

  const response = await fetch(`http://localhost:3001/posts/${id}`);
  const post = await response.json();

  if (!post) {
    return <p>Post not found</p>;
  }

  // Pass the post data to the client component
  return <PostPage post={post} />;
}
