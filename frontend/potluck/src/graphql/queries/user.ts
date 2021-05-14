import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";

export type User = {
  id: string;
  subscribed?: boolean;
  username?: string;
};

export const getUserByIdentity = gql`
  query getUserByIdentity {
    getUserByIdentity {
      id
      username
    }
  }
`;

export async function getUser(): Promise<User> {
  const user = await API.graphql(graphqlOperation(getUserByIdentity));

  //@ts-ignore
  return user.data.getUserByIdentity;
}
