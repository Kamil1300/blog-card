// pages/posts/[id].tsx
import { GetServerSideProps } from 'next';
import axios from 'axios';

const PostPage = ({ post }: { post: any }) => {
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
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
