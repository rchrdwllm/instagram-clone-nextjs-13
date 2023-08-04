import { createUrl } from './utils';
import { createPost } from './postActions';
import sha1 from 'sha1';
import axios from 'axios';

export const uploadImages = async (imgs: File[], caption: string) => {
    const uploadedImgs = await Promise.all(
        imgs.map(async img => {
            const formData = new FormData();

            formData.append('file', img);
            formData.append('upload_preset', 'rwilliam');

            const res = await fetch('https://api.cloudinary.com/v1_1/rwilliam/image/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            return data;
        })
    );

    const res = await fetch(
        new Request(createUrl('/api/images'), {
            method: 'POST',
            body: JSON.stringify({ uploadedImgs }),
        })
    );
    const data = await res.json();

    createPost(data.data, caption);
};

export const deleteImages = async (publicIds: string[]) => {
    await fetch(new Request(createUrl('/api/images')), {
        method: 'DELETE',
        body: JSON.stringify({ publicIds }),
    });

    const generateSHA1 = (data: string) => {
        const sha1Signature = sha1(data);

        return sha1Signature;
    };

    const generateSignature = (publicId: string, apiSecret: string) => {
        const timestamp = Math.round(new Date().getTime() / 1000);
        return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    };

    const apiKey = '677182174977128';
    const apiSecret = 'XAcoEtXVfXdszd2K4s_To0xdBfE';

    await Promise.all(
        publicIds.map(async publicId => {
            const timestamp = Math.round(new Date().getTime() / 1000);
            const signature = generateSHA1(generateSignature(publicId, apiSecret));
            const url = `https://api.cloudinary.com/v1_1/rwilliam/image/destroy`;

            await axios.post(url, {
                public_id: publicId,
                signature: signature,
                api_key: apiKey,
                timestamp: timestamp,
            });
        })
    );
};
