import React, { useState, useEffect, useContext } from "react";
import { Comment, AddComment } from "components";
import { fetchBusinessReviews, Review } from "graphql/queries";
import {
  addReview as addReviewMutation,
  deleteReview as deleteReviewMutation,
} from "graphql/mutations";
import moment from "moment";
import appcontext from "appcontext";

export default function Reviews({ businessId }: { businessId?: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const ctx = useContext(appcontext);
  const user = ctx?.dynamoUser;

  useEffect(() => {
    init();
  }, []);

  async function init() {
    // @ts-ignore
    const reviews = await fetchBusinessReviews(businessId);
    setReviews(reviews);
  }

  function renderReviews() {
    return reviews.map(({ username, createdAt, text, userId, id }) => (
      <Comment
        {...{
          username,
          text,
          date: moment.unix(createdAt).format("MMMM Do YYYY h:mm a"),
          userId,
          onClickDelete: () => deleteReview(id, createdAt),
        }}
      />
    ));
  }

  async function deleteReview(id: string, createdAt: number) {
    deleteReviewMutation({ id, createdAt });
    setReviews((currState) => currState.filter((review) => review.id !== id));
  }

  async function addReview(text: string) {
    if (ctx?.dynamoUser) {
      const review: Review = {
        id: businessId ?? String(~~(+new Date() / 1000)),
        text,
        username: "ashtonfromnj",
        createdAt: ~~(+new Date() / 1000),
        userId: user?.id ?? ctx?.user.username,
      };

      addReviewMutation(review);

      setReviews((currState) => [review, ...currState]);
    }
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: 15,
        maxWidth: 420,
      }}
    >
      <AddComment onShare={addReview} disabled={!user} />

      {renderReviews()}
    </div>
  );
}
