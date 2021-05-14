import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";

export const updateUserSettings = gql`
  mutation updateUserSettings($settings: SettingsInput) {
    updateUserSettings(input: { settings: $settings }) {
      id
      settings {
        darkMode
        favorites {
          name
        }
      }
    }
  }
`;

export const updateUserDoc = gql`
  mutation updateUser($input: UserInput!) {
    updateUser(input: $input) {
      id
      username
    }
  }
`;

export async function updateSettings({
  darkMode,
  favorites,
}: {
  darkMode?: boolean;
  favorites?: string[];
}) {
  const user = await API.graphql(
    graphqlOperation(updateUserSettings, {
      input: {
        darkMode,
        favorites,
      },
    })
  );

  return user;
}

export async function updateUser({
  id,
  username,
}: {
  id: string;
  username: string;
}) {
  const user = await API.graphql(
    graphqlOperation(updateUserDoc, {
      input: {
        id,
        username,
      },
    })
  );

  //@ts-ignore
  return user.data.updateUser;
}
