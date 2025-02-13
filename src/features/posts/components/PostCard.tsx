import { PostItemType } from '../store/post.type';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { Card } from '@/UI/Elements/Card';
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/UI/Elements/Card/Card';
import { Text } from '@/UI/Elements/Text';
import { Link } from 'react-router-dom';

type Props = {
  post: PostItemType;
};

export function PostCard({ post }: Props) {
  return (
    <Card
      className="my-4 w-full"
      data-testid="post-item"
    >
      <div className="flex flex-row items-center">
        <div className="basis-3/4">
          <CardHeader>
            <CardTitle>{post?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Text as="p">{post?.body.slice(0, 75)}...</Text>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-4">
              <Link
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                to={`/posts/${post.id}`}
              >
                View Post
              </Link>
              <Link
                to={`/posts/edit/${post.id}`}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Edit Post
              </Link>
            </div>
          </CardFooter>
        </div>
        <div className="mx-auto basis-1/4 text-center">
          <PostAuthor userId={post.userId} />
          <div className="pt-3">
            <TimeAgo timestamp={post?.date} />
          </div>
        </div>
      </div>
    </Card>
  );
}
