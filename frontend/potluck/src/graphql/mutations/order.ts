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
  try {
    const res = await API.graphql(
      graphqlOperation(sendEmailDoc, {
        input,
      })
    );

    //@ts-ignore
    return res.data.sendEmail;
  } catch (e) {
    return e;
  }
}
