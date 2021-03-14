import { AWSAppSyncClient, AUTH_TYPE } from "aws-appsync";
import gql from "graphql-tag";
require("isomorphic-fetch");

export async function updateUser({
  cognitoSub,
  stripeCustomerId,
}: {
  cognitoSub: string;
  stripeCustomerId: string;
}) {
  console.log(cognitoSub);
  console.log(stripeCustomerId);

  const client = new AWSAppSyncClient({
    disableOffline: true,
    url:
      "https://ckjug44esfctxapr76ydza3cmm.appsync-api.us-east-1.amazonaws.com/graphql",
    region: "us-east-1",
    auth: {
      type: AUTH_TYPE.AWS_IAM,
      credentials: {
        accessKeyId: "AKIASWL2SMYCAVSHZDMG",
        secretAccessKey: "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",
      },
    },
  });

  const UpdateUser = gql`
    mutation UpdateUser($input: UserInput!) {
      updateUser(input: $input) {
        id
      }
    }
  `;

  try {
    await client.hydrated();

    const transactionComplete: any = await client.mutate({
      mutation: UpdateUser,
      variables: {
        input: {
          id: cognitoSub,
          stripeCustomerId: stripeCustomerId,
        },
      },
    });

    console.log(transactionComplete);

    return transactionComplete.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
