import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";

export const startCheckoutSessionDoc = gql`
  mutation StartCheckoutSession($priceId: String!) {
    startCheckoutSession(priceId: $priceId)
  }
`;

export async function startCheckoutSession({ priceId }: { priceId: string }) {
  const res = await API.graphql(
    graphqlOperation(startCheckoutSessionDoc, {
      priceId,
    })
  );

  return res;
}

export const completeCheckoutSessionDoc = gql`
  mutation CompleteCheckoutSession($sessionId: String!) {
    completeCheckoutSession(sessionId: $sessionId)
  }
`;

export async function completeCheckoutSession({
  sessionId,
}: {
  sessionId: string;
}): Promise<string> {
  const res = await API.graphql(
    graphqlOperation(completeCheckoutSessionDoc, {
      sessionId,
    })
  );

  //@ts-ignore
  return res.data.completeCheckoutSession;
}

export const createPortalSessionDoc = gql`
  mutation CreatePortalSession($customerId: String!) {
    createPortalSession(customerId: $customerId)
  }
`;

export async function createPortalSession({
  customerId,
}: {
  customerId: string;
}): Promise<string> {
  const res = await API.graphql(
    graphqlOperation(createPortalSessionDoc, {
      customerId,
    })
  );

  //@ts-ignore
  return res.data.createPortalSession;
}

export async function goToBilling({ customerId }: { customerId: string }) {
  const portalLink = await createPortalSession({ customerId });
  window.location.replace(portalLink);
}
