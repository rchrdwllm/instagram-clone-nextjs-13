import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
    return (
        <div className="pt-8 px-72 pb-20">
            <header className="flex items-center space-x-8">
                <Skeleton className="h-[140px] w-[140px] rounded-full" />
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                </div>
            </header>
        </div>
    );
};

export default Loading;
