import { Container } from '@/UI/Elements/Container';
import { PostDetails } from '@/features/posts/components/PostDetails';
import { useParams } from 'react-router-dom';

function PostDetailsPage() {
  const { postId } = useParams();

  return (
    <Container>
      <PostDetails postId={Number(postId)} />
    </Container>
  );
}

export default PostDetailsPage;
