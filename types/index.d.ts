import type { Post } from '@prisma/client';

export interface FeedItem extends Post {
    imageItems: Image[];
}

export type RequestParams = {
    id: string;
};
