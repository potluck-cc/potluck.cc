import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";
import { MenuItem } from "types";

export const updateBusinessDoc = gql`
  mutation UpdateBusiness($input: EditBusinessInput!) {
    updateBusiness(input: $input) {
      id
      title
      description
      slug
      avatar
      menu {
        title
        items
      }
    }
  }
`;

export const addReviewDoc = gql`
  mutation AddReview($input: AddReviewInput!) {
    addReview(input: $input) {
      id
      text
      username
      userId
    }
  }
`;

export const deleteReviewDoc = gql`
  mutation DeleteReview($input: DeleteReviewInput!) {
    deleteReview(input: $input) {
      id
    }
  }
`;

export async function addReview({
  id,
  text,
  username,
  createdAt,
  userId,
}: {
  id: string;
  text: string;
  username: string;
  userId: string;
  createdAt: number;
}) {
  const review = await API.graphql(
    graphqlOperation(addReviewDoc, {
      input: {
        id,
        text,
        username,
        createdAt,
        userId,
      },
    })
  );

  return review;
}

export async function deleteReview({
  id,
  createdAt,
}: {
  id: string;
  createdAt: number;
}) {
  const review = await API.graphql(
    graphqlOperation(deleteReviewDoc, {
      input: {
        id,
        createdAt,
      },
    })
  );

  return review;
}

export async function updateBusiness({
  id,
  description,
  menu,
}: {
  id: string;
  description: string;
  menu: MenuItem[];
}) {
  const user = await API.graphql(
    graphqlOperation(updateBusinessDoc, {
      input: {
        id,
        description,
        menu,
      },
    })
  );

  return user;
}
