import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";

interface SendEmailInput {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  businessEmail: string;
  merch: string[];
  gifts: string[];
}

export const sendEmailDoc = gql`
  mutation SendEmail($input: SendEmailInput!) {
    sendEmail(input: $input)
  }
`;

export async function sendEmail(input: SendEmailInput) {
  const user = await API.graphql(
    graphqlOperation(sendEmailDoc, {
      input,
    })
  );

  return user;
}
