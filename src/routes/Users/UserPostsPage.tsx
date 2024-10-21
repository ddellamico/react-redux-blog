import { Container } from '@/UI/Elements/Container';
import { SkeletonList } from '@/UI/Elements/Skeleton';
import { Text } from '@/UI/Elements/Text';
import { UserPosts } from '@/features/users/components/UserPosts';
import { selectUserById } from '@/features/users/store/user.selector';
import { useAppSelector } from '@/shared/store/types';
import { useParams } from 'react-router-dom';

function UserPostsPage() {
  const { userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));

  if (!user) {
    return (
      <Container>
        <SkeletonList className="py-8" />
      </Container>
    );
  }

  return (
    <Container>
      <Text
        size="7"
        as="p"
      >
        {user.name}
      </Text>
      <UserPosts userId={Number(userId)} />
    </Container>
  );
}

export default UserPostsPage;
