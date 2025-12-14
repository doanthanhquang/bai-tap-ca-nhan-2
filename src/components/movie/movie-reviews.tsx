import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Star, AlertTriangle } from "lucide-react";
import type { Review } from "@/api/types";

interface MovieReviewsProps {
  reviews: Review[];
}

const MovieReviews = ({ reviews }: MovieReviewsProps) => {
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(
    new Set()
  );

  const toggleExpand = (reviewId: number) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <Card id="reviews-section" className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Reviews ({reviews.length})
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const shouldShowReadMore = review.content.length > 300;
          const displayContent =
            isExpanded || !shouldShowReadMore
              ? review.content
              : review.content.slice(0, 300) + "...";

          return (
            <Card
              key={review.id}
              className="p-4 bg-gray-50 dark:bg-gray-800/50"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {review.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    by {review.username} •{" "}
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                    {review.rate}/10
                  </span>
                </div>
              </div>

              {/* Spoiler Warning */}
              {review.warning_spoilers && (
                <div className="flex items-center gap-2 mb-3 p-2 bg-orange-100 dark:bg-orange-900/20 rounded border border-orange-300 dark:border-orange-800">
                  <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">
                    This review contains spoilers
                  </span>
                </div>
              )}

              {/* Review Content */}
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {displayContent}
              </p>

              {/* Read More Button */}
              {shouldShowReadMore && (
                <button
                  onClick={() => toggleExpand(review.id)}
                  className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default MovieReviews;
