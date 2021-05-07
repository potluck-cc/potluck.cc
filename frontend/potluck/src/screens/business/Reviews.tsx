import React from "react";
import { Comment, AddComment } from "components";

export default function Reviews() {
  const data = [
    {
      username: "ashtonfromnj",
      createdAt: "May 7, 2021",
      text: "Fake ass comment, lol.",
    },
  ];

  function renderComments() {
    return data.map(({ username, createdAt, text }) => (
      <Comment {...{ username, text, date: createdAt }} />
    ));
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: 15,
        maxWidth: 420,
      }}
    >
      <AddComment />

      {renderComments()}
    </div>
  );
}
