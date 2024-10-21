import { selectUserById } from '../store/user.selector';
import { Card } from '@/UI/Elements/Card';
import { CardContent, CardHeader, CardTitle } from '@/UI/Elements/Card/Card';
import { Text } from '@/UI/Elements/Text';
import { useAppSelector } from '@/shared/store/types';
import { Link } from 'react-router-dom';

interface UserCardProps {
  userId: number;
}

export function UserCard({ userId }: UserCardProps) {
  const userItem = useAppSelector((state) => selectUserById(state, userId));

  return (
    <Card
      className="my-4 w-full"
      data-testid="user-item"
    >
      <div className="flex flex-row items-center">
        <div className="basis-3/4">
          <CardHeader>
            <CardTitle>{userItem?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Text as="p">{userItem?.username}</Text>
          </CardContent>
          <CardContent>
            <Text as="p">{userItem?.email}</Text>
          </CardContent>
        </div>
        <div className="mx-auto basis-1/4 text-center">
          <Text
            as="p"
            className="py-4 text-center"
            size="2"
          >
            {userItem?.phone} - {userItem?.website}
          </Text>
          <Link
            to={`/users/${userId}`}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            View Posts
          </Link>
        </div>
      </div>
    </Card>
  );
}
