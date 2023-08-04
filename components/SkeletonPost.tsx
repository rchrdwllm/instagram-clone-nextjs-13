import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

const SkeletonPost = () => {
    return (
        <Card>
            <CardHeader>
                <header className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-[40px] w-[40px] rounded-full" />
                        <Skeleton className="h-4 w-[225px]" />
                    </div>
                </header>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-4 w-[64px]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </CardContent>
        </Card>
    );
};

export default SkeletonPost;
