import { Container } from '@/UI/Elements/Container';
import { Text } from '@/UI/Elements/Text';
import { AddPostForm } from '@/features/posts/components/AddPostForm';

function CreatePostPage() {
  return (
    <Container>
      <Text
        size="7"
        as="p"
      >
        Create Post
      </Text>
      <AddPostForm />
    </Container>
  );
}

export default CreatePostPage;
