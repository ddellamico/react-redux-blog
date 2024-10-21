import { useAddReactionMutation } from '../store/post.api';
import { PostItemType } from '../store/post.type';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

interface ReactionButtonsProps {
  post: PostItemType;
}

export function ReactionButtons({ post }: ReactionButtonsProps) {
  const [addReaction] = useAddReactionMutation();

  // If reactions is null, initialize it with default values
  const reactions = post.reactions ?? {
    thumbsUp: 0,
    wow: 0,
    heart: 0,
    rocket: 0,
    coffee: 0,
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => {
          const newValue = reactions[name] + 1;
          addReaction({
            postId: post.id,
            reactions: { ...reactions, [name]: newValue },
          });
        }}
      >
        {emoji} {reactions[name]}
      </button>
    ));

  return <div>{reactionButtons}</div>;
}
