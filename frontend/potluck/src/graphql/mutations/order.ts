import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

interface SendEmailInput {
  name: string;
  city: string;
  phone: string;
  businessEmail: string;
  preferredStrain: string[];
  gifts: string[];
}

export const sendEmailDoc = gql`
  mutation SendEmail($input: SendEmailInput!) {
    sendEmail(input: $input)
  }
`;

export async function sendEmail(input: SendEmailInput) {
  try {
    // const res = await API.graphql(
    //   graphqlOperation(sendEmailDoc, {
    //     input,
    //   })
    // );

    const res = await API.graphql({
      query: sendEmailDoc,
      variables: { input },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    });

    //@ts-ignore
    return res.data.sendEmail;
  } catch (e) {
    return e;
  }
}
