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
