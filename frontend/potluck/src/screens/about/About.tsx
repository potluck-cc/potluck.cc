import React from "react";
import Typography from "@material-ui/core/Typography";

export default function () {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        width: "95vw",
        paddingTop: 20,
      }}
    >
      <Typography gutterBottom variant="h4">
        1. What is Potluck?
      </Typography>
      <Typography gutterBottom variant="h6" component="h6">
        We are a referral service that provides a curated list of AS21/S21
        compliant gift shops in New Jersey.
      </Typography>
      <Typography gutterBottom variant="h6" component="h6">
        Customers are allowed to fill out and submit an order form that is sent
        off to the gift shop.
      </Typography>
      <Typography gutterBottom variant="h6" component="h6">
        If you're{" "}
        <b>
          <i>lucky</i>
        </b>
        , the gift shop may include a free sample or gift of cannabis if and/or
        when they fulfill your order.
      </Typography>

      <Typography gutterBottom variant="h4">
        2. Why subscribers only?
      </Typography>
      <Typography gutterBottom variant="h6" component="h6">
        We are building a virtual cannabis community built on mutual trust and
        safety.
      </Typography>
      <Typography gutterBottom variant="h6" component="h6">
        On our side, we do the groundwork to ensure that the gift shops we work
        with are highly invested in delivering a quality, respectful and safe
        experience.
      </Typography>
      <Typography gutterBottom variant="h6" component="h6">
        We also want to ensure that the customers we refer to the gift shops are
        committed to this experience as well. To ensure this, in the future our
        referral system will be available to subscribed members only.
      </Typography>

      <Typography gutterBottom variant="h4">
        3. Your data
      </Typography>
      <Typography gutterBottom variant="h6" component="h6">
        We keep track of your user/login credentials. We do not share your
        information with the gift shops or any one else. If you fill out a
        survey and submit it to a gift shop, the gift shop only sees what you
        filled out on the form.
      </Typography>
    </div>
  );
}
