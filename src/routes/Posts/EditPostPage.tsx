import { Container } from '@/UI/Elements/Container';
import { SkeletonCard } from '@/UI/Elements/Skeleton';
import { Text } from '@/UI/Elements/Text';
import { EditPostForm } from '@/features/posts/components/EditPostForm';
import { selectPostById } from '@/features/posts/store/post.selector';
import { useAppSelector } from '@/shared/store/types';
import { useParams } from 'react-router-dom';

function EditPostPage() {
  const { postId } = useParams();
  const post = useAppSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <Container>
        <SkeletonCard className="py-8" />
      </Container>
    );
  }

  return (
    <Container>
      <Text
        size="7"
        as="p"
      >
        Edit Post
      </Text>
      <EditPostForm post={post} />
    </Container>
  );
}

export default EditPostPage;
