import { AWSAppSyncClient, AUTH_TYPE } from "aws-appsync";
import gql from "graphql-tag";
require("isomorphic-fetch");

export async function getUser({ cognitoSub }: { cognitoSub: string }) {
  console.log(cognitoSub);

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

  const getUserDoc = gql`
    query getUser($id: ID!) {
      getUser(id: $id) {
        id
        stripeCustomerId
      }
    }
  `;

  try {
    await client.hydrated();

    const transactionComplete: any = await client.query({
      query: getUserDoc,
      variables: {
        input: {
          id: cognitoSub,
        },
      },
    });

    return transactionComplete.data.getUser;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
