import SkeletonPost from '@/components/SkeletonPost';

const Loading = () => {
    return (
        <div className="h-screen flex flex-col space-y-8 pt-8 px-72 pb-20 2xl:px-[28rem] xl:px-80 lg:px-56">
            <SkeletonPost />
            <SkeletonPost />
        </div>
    );
};

export default Loading;
