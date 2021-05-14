import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

export type Review = {
  id: string;
  text: string;
  username: string;
  createdAt: number;
  userId: string;
};

export const getFeaturedBusinesses = gql`
  query getFeaturedBusinesses {
    getFeaturedBusinesses {
      items {
        id
        title
        description
        slug
        avatar
        email
        menu {
          title
          items
        }
      }
    }
  }
`;

export const getBusinessBySlug = gql`
  query getBusinessBySlug($slug: String!) {
    getBusinessBySlug(slug: $slug) {
      items {
        id
        title
        description
        slug
        avatar
        email
        menu {
          title
          items
        }
      }
    }
  }
`;

export const getBusinessReviews = gql`
  query getBusinessReviews($businessId: ID!) {
    getBusinessReviews(businessId: $businessId) {
      items {
        id
        text
        username
        createdAt
        userId
      }
      nextToken
    }
  }
`;

export async function fetchFeaturedBusinesses() {
  try {
    const businesses = await API.graphql({
      query: getFeaturedBusinesses,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    });
    //@ts-ignore
    return businesses.data.getFeaturedBusinesses.items;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function fetchBusinessWithSlug(slug: string) {
  const businesses = await API.graphql({
    query: getBusinessBySlug,
    variables: { slug },
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  });

  //@ts-ignore
  return businesses.data.getBusinessBySlug.items[0];
}

export async function fetchBusinessReviews(businessId: string) {
  const reviews = await API.graphql({
    query: getBusinessReviews,
    variables: { businessId },
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  });

  //@ts-ignore
  return reviews.data.getBusinessReviews.items;
}
