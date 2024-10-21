import { userApi } from '../store';
import { selectUserIds } from '../store/user.selector';
import { UserCard } from './UserCard';
import { SkeletonList } from '@/UI/Elements/Skeleton';
import { useAppSelector } from '@/shared/store/types';

export function UserList() {
  const { isLoading, isSuccess } = userApi.useGetUserListQuery();

  const userIds = useAppSelector(selectUserIds);

  if (isLoading) {
    return <SkeletonList className="py-8" />;
  }

  return isSuccess
    ? userIds?.map((userId) => (
        <UserCard
          key={userId}
          userId={userId}
        />
      ))
    : undefined;
}
