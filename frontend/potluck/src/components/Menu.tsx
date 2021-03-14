import React from "react";
import Typography from "@material-ui/core/Typography";
import { MenuItem } from "types";

export default function ({
  data = [],
  description,
}: {
  data?: MenuItem[];
  description?: string;
}) {
  function renderMenu() {
    return data?.map((d) => {
      return (
        <div
          style={{
            textAlign: "center",
            padding: 15,
            width: 420,
          }}
        >
          {description && (
            <>
              <Typography
                gutterBottom
                style={{
                  fontFamily: "Roboto",
                  fontSize: "1.3rem",
                  lineHeight: "35px",
                }}
              >
                {description}
              </Typography>
            </>
          )}
          <Typography gutterBottom variant="h3" component="h2">
            {d.title}
          </Typography>
          <Typography gutterBottom variant="h6">
            {d.items.join(" / ")}
          </Typography>
        </div>
      );
    });
  }

  return <div>{renderMenu()}</div>;
}
