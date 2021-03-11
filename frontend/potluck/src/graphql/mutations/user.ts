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
