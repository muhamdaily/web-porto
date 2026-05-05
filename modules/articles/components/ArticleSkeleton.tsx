import Card from "@/common/components/elements/Card";
import SkeletonLoader from "@/common/components/elements/SkeletonLoader";
import Skeleton from "react-loading-skeleton";

const ArticleSkeleton = () => {
    return (
        <SkeletonLoader>
            <Card>
                <Skeleton className="h-44 w-full rounded-xl" />
                <div className="flex flex-col gap-3 p-4">
                    <Skeleton className="h-5 w-4/5" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="flex gap-4 pt-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                </div>
            </Card>
        </SkeletonLoader>
    );
};

export default ArticleSkeleton;
