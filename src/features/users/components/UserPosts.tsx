import { SkeletonList } from '@/UI/Elements/Skeleton';
import { PostCard } from '@/features/posts/components';
import { postApi } from '@/features/posts/store';
import { selectPostsByUserId } from '@/features/posts/store/post.selector';
import { useAppSelector } from '@/shared/store/types';

interface UserPostsProps {
  userId: number;
  onDeleteClick?: (postId: number) => void;
}

export function UserPosts({ userId }: UserPostsProps) {
  const { isLoading, isSuccess, isError } =
    postApi.useGetPostsByUserIdQuery(userId);

  const userPosts = useAppSelector(selectPostsByUserId(userId));

  let content: React.ReactNode;

  if (isLoading) {
    content = <SkeletonList className="py-8" />;
  } else if (isSuccess) {
    content = userPosts.length > 0 ? (
      userPosts.map((userPost) => (
        <PostCard
          key={userPost.id}
          post={userPost}
        />
      ))
    ) : (
      <div className="mx-auto my-4 max-w-lg rounded-md border border-blue-400 bg-blue-100 px-4 py-3 text-blue-700">
        <p>No posts found.</p>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="mx-auto my-4 max-w-lg rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700">
        <p>Error retrieving posts</p>
      </div>
    );
  }

  return content;
}
