import SkeletonPost from '@/components/SkeletonPost';

const Loading = () => {
    return (
        <div className="h-screen flex flex-col space-y-8 pt-8 px-56 pb-20">
            <SkeletonPost />
            <SkeletonPost />
        </div>
    );
};

export default Loading;
