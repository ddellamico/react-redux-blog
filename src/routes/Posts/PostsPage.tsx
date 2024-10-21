import { Container } from '@/UI/Elements/Container';
import { Text } from '@/UI/Elements/Text';
import { PostList } from '@/features/posts/components';
import { Link } from 'react-router-dom';

function PostsPage() {
  return (
    <Container>
      <div className="mb-4 flex items-center justify-between">
        <Text
          size="7"
          as="p"
        >
          Posts
        </Text>
        <Link
          to="/posts/create"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Create New Post
        </Link>
      </div>
      <PostList />
    </Container>
  );
}

export default PostsPage;
