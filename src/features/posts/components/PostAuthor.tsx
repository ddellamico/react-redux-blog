import { selectUserById } from '@/features/users/store/user.selector';
import { useAppSelector } from '@/shared/store/types';
import { Link } from 'react-router-dom';

type UserProfileProps = {
  userId: number;
};

function PostAuthor({ userId }: UserProfileProps) {
  const author = useAppSelector((state) => selectUserById(state, userId));

  return (
    <span>
      by{' '}
      {author ? (
        <Link to={`/users/${userId}`}>{author.name}</Link>
      ) : (
        'Unknown author'
      )}
    </span>
  );
}
export default PostAuthor;
