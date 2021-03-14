import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import { completeCheckoutSession } from "graphql/mutations";
import Typography from "@material-ui/core/Typography";

export default function () {
  const params = useParams();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    //@ts-ignore
    if (params && params.sessionId) {
      //@ts-ignore
      const sessionId = params.sessionId;
      const portalLink = await completeCheckoutSession({ sessionId });
      window.location.replace(portalLink);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress style={{ marginBottom: 8 }} />

      <Typography variant="body2" color="textSecondary" component="p">
        Upgrading your profile... please hold & do not navigate away from this
        page.
      </Typography>
    </div>
  );
}
