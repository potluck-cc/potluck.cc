import React from "react";
import Typography from "@material-ui/core/Typography";

export default function () {
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
      <Typography gutterBottom variant="h4">
        1. What is Potluck?
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="h6">
        Potluck is a virtual cannabis club and referral service that provides a
        curated list of gift shops selling terracotta clay pots. Subscribed
        members are allowed to fill out and submit an order form that is sent
        off to the gift shop. The gift shop may include a free sample or gift of
        cannabis.
      </Typography>

      <Typography gutterBottom variant="h4">
        2. Is cannabis legal in NJ?
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="h6">
        It is legal to possess 1 ounce or less of cannabis. You cannot sell or
        buy cannabis. We do not sell cannabis. We are a virtual cannabis club
        and referral service.
      </Typography>

      <Typography gutterBottom variant="h4">
        3. What if something goes wrong with my order?
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="h6">
        Potluck does not sell terracotta clay pots or cannabis and is not
        involved with the business operations of the gift shops. We are a
        virtual cannabis club and referral service. Submission of an order does
        not guarantee fulfillment. Any issues with your order must be handled
        with the gift shop.
      </Typography>

      <Typography gutterBottom variant="h4">
        4. Contact Us
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="h6">
        Email: potluckcc@gmail.com
      </Typography>

      <Typography gutterBottom variant="subtitle1" component="h6">
        Instagram: @potluckcc
      </Typography>
    </div>
  );
}
