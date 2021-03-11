import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

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
