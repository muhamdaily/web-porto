import Card from "@/common/components/elements/Card";
import SkeletonLoader from "@/common/components/elements/SkeletonLoader";
import Skeleton from "react-loading-skeleton";

const BlogSkeleton = () => {
    return (
        <SkeletonLoader>
            <Card>
                <Skeleton className="h-[200px] w-full rounded-t-xl" />
                <div className="flex flex-col space-y-3 p-5">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-6" />
                    <div className="flex flex-col gap-1">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-4" />
                        ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-5 w-16" />
                        ))}
                    </div>
                    <Skeleton className="h-4 w-24" />
                </div>
            </Card>
        </SkeletonLoader>
    );
};

export default BlogSkeleton;