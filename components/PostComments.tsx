import type { Comment } from '@prisma/client';
import PostComment from './PostComment';

const PostComments = ({ comments }: { comments: Comment[] }) => {
    return (
        <div className="flex flex-col space-y-2">
            {comments.map(comment => (
                <PostComment key={comment.id} {...comment} />
            ))}
        </div>
    );
};

export default PostComments;
