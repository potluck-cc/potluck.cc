import React from "react";
import Typography from "@material-ui/core/Typography";

export default function ({ description = "" }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        textAlign: "center",
        flexDirection: "column",
        maxWidth: 520,
      }}
    >
      {description && description.length && (
        <>
          <Typography gutterBottom variant="h3" component="h2">
            About
          </Typography>
          <Typography gutterBottom variant="h6">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Typography>
        </>
      )}
    </div>
  );
}
