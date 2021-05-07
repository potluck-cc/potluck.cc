import React from "react";
import Typography from "@material-ui/core/Typography";
import { MenuItem } from "types";
import Order from "./Order";
import Button from "@material-ui/core/Button";

export default function ({
  menu = [],
  businessEmail,
  orderFormToggled,
  toggleOrderForm,
}: {
  menu?: MenuItem[];
  businessEmail?: string;
  orderFormToggled?: boolean;
  toggleOrderForm?: (value: boolean) => void;
}) {
  function renderMenu() {
    return menu?.map((d) => {
      return (
        <div>
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

  return (
    <div
      style={{
        textAlign: "center",
        padding: 15,
        maxWidth: 420,
      }}
    >
      {orderFormToggled ? (
        <>
          <Order menu={menu} businessEmail={businessEmail} />
        </>
      ) : (
        <>{renderMenu()}</>
      )}

      {!orderFormToggled && (
        <Button
          size="large"
          color="primary"
          variant="contained"
          style={{ marginBottom: 8 }}
          onClick={() => toggleOrderForm && toggleOrderForm(!orderFormToggled)}
        >
          Order Now
        </Button>
      )}
    </div>
  );
}
