import { useDeletePostMutation } from '../store/post.api';
import { selectPostById } from '../store/post.selector';
import PostAuthor from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { Button } from '@/UI/Elements/Button';
import { Card } from '@/UI/Elements/Card';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/UI/Elements/Card/Card';
import { SkeletonCard } from '@/UI/Elements/Skeleton';
import { Text } from '@/UI/Elements/Text';
import { useAppSelector } from '@/shared/store/types';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  postId: number;
};

export function PostDetails({ postId }: Props) {
  const navigate = useNavigate();
  const postItem = useAppSelector((state) => selectPostById(state, postId));
  const [deletePost] = useDeletePostMutation();

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: postId }).unwrap();
      navigate('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete the post', error);
    }
  };

  // Check if the post exists before rendering
  if (!postItem) {
    return <SkeletonCard />;
  }

  return (
    <Card
      className="my-4 w-full"
      data-testid="post-item"
    >
      <div className="flex flex-row items-center">
        <div className="basis-3/4">
          <CardHeader>
            <CardTitle>{postItem.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Text as="p">{postItem.body}</Text>
          </CardContent>
          <CardFooter>
            <PostAuthor userId={postItem.userId} />
            <TimeAgo timestamp={postItem.date} />
          </CardFooter>
          <div className="mt-4 rounded-md p-4">
            <ReactionButtons post={postItem} />
          </div>
        </div>
        <div className="mx-auto basis-1/4 text-center">
          <div className="flex items-center space-x-4">
            <Link
              to={`/posts/edit/${postId}`}
              className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            >
              Edit
            </Link>

            <Button
              onClick={onDeletePostClicked}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
