import type { Comment } from '@prisma/client';
import { getUserById } from '@/lib/auth';

const PostComment = async ({ content, userId }: Comment) => {
    const user = await getUserById(userId);

    return (
        <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-50">{user.firstName}</span> {content}
        </p>
    );
};

export default PostComment;
