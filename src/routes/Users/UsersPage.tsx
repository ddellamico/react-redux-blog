import { Container } from '@/UI/Elements/Container';
import { Text } from '@/UI/Elements/Text';
import { UserList } from '@/features/users/components';

function UsersPage() {
  return (
    <Container>
      <Text
        size="7"
        as="p"
      >
        Users
      </Text>
      <UserList />
    </Container>
  );
}

export default UsersPage;
