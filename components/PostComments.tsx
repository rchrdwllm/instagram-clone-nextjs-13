import type { Comment } from '@prisma/client';
import PostComment from './PostComment';
import CommentForm from './CommentForm';

const PostComments = ({ id, comments }: { id: string; comments: Comment[] }) => {
    return (
        <div>
            <div className="flex flex-col space-y-2">
                {comments.map(comment => (
                    <PostComment key={comment.id} {...comment} />
                ))}
            </div>
            <CommentForm id={id} />
        </div>
    );
};

export default PostComments;
