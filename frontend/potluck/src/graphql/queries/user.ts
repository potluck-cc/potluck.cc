import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";

export type User = {
  id: string;
  subscribed: boolean;
  stripeCustomerId: string;
};

export const getUserByIdentity = gql`
  query getUserByIdentity {
    getUserByIdentity {
      id
      subscribed
      stripeCustomerId
    }
  }
`;

export async function getUser(): Promise<User> {
  const user = await API.graphql(graphqlOperation(getUserByIdentity));

  //@ts-ignore
  return user.data.getUserByIdentity;
}
