import { createUrl } from './utils';
import { deleteImages, uploadImages } from './imageActions';

export const createPost = async (imgs: { public_id: string }[], caption: string) => {
    await fetch(
        new Request(createUrl('/api/posts'), {
            method: 'POST',
            body: JSON.stringify({ imgs: imgs.map(img => img.public_id), caption }),
        })
    );
};

export const submitPost = async (imgs: File[], caption: string) => {
    await uploadImages(imgs, caption);
};

export const deletePost = async (postId: string) => {
    const res = await fetch(
        new Request(createUrl(`/api/posts/${postId}`), {
            method: 'DELETE',
        })
    );
    const data = await res.json();
    const publicIds = data.data.images;

    if (res.ok) {
        deleteImages(publicIds);
    }

    return data.data;
};

export const likePost = async (postId: string) => {
    const res = await fetch(
        new Request(createUrl(`/api/posts/${postId}/likes`), {
            method: 'POST',
        })
    );
    const data = await res.json();

    return data.data;
};

export const bookmarkPost = async (postId: string) => {
    const res = await fetch(
        new Request(createUrl(`/api/posts/${postId}/bookmarks`), {
            method: 'POST',
        })
    );
    const data = await res.json();

    return data.data;
};

export const updatePost = async (postId: string, caption: string) => {
    const res = await fetch(
        new Request(createUrl(`/api/posts/${postId}`), {
            method: 'PATCH',
            body: JSON.stringify({ caption }),
        })
    );
    const data = await res.json();

    return data.data;
};

export const commentPost = async (postId: string, comment: string) => {
    const res = await fetch(new Request(createUrl(`/api/posts/${postId}/comments`)), {
        method: 'POST',
        body: JSON.stringify({ comment }),
    });
    const data = await res.json();

    return data.data;
};
