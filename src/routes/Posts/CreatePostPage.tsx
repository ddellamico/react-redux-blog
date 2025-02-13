import { Container } from '@/UI/Elements/Container';
import { Text } from '@/UI/Elements/Text';
import { AddPostForm } from '@/features/posts/components/AddPostForm';

function CreatePostPage() {
  return (
    <Container>
      <div className="mb-4 items-center">
        <Text
          className="text-center"
          size="7"
          as="p"
        >
          Create Post
        </Text>
      </div>
      <AddPostForm />
    </Container>
  );
}

export default CreatePostPage;
