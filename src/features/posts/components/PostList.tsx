import { postApi } from '../store';
import { selectAllPosts } from '../store/post.selector';
import { PostCard } from './PostCard';
import { SkeletonList } from '@/UI/Elements/Skeleton';
import { useAppSelector } from '@/shared/store/types';

export function PostList() {
  const { isLoading, isSuccess, isError } = postApi.useGetPostListQuery();

  const posts = useAppSelector(selectAllPosts);

  let content: React.ReactNode;

  if (isLoading) {
    content = <SkeletonList className="py-8" />;
  } else if (isSuccess) {
    content = posts?.map((post) => (
      <PostCard
        key={post.id}
        post={post}
      />
    ));
  } else if (isError) {
    content = (
      <div className="mx-auto my-4 max-w-lg rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700">
        <p>Error retrieving posts</p>
      </div>
    );
  }

  return content;
}
