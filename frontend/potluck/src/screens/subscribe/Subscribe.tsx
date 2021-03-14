import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import appcontext from "../../appcontext";
import "react-credit-cards/es/styles-compiled.css";
import { createStripeSession } from "./functions";

export default function () {
  const ctx = useContext(appcontext);

  function handleCloseDialog() {
    ctx?.setSubscribeDialogActive(false);
  }

  async function handleClick() {
    const liveKey =
      "pk_live_51IR9uPLKwcvtvXgDrH0S4HPHyeasYOovurPKRUNQrgugbniURsRZwS72FsaX3jtu18icosAJGycj0LEBWK1FCgss00eVGflzbK";
    const sessionId = await createStripeSession();

    //@ts-ignore
    if (window?.Stripe) {
      //@ts-ignore
      const s = window.Stripe;
      const stripe = new s(liveKey);

      stripe.redirectToCheckout({
        sessionId,
      });
    }
  }

  function renderContent() {
    if (!ctx?.authenticated) {
      return (
        <>
          <Typography gutterBottom variant="subtitle1">
            You have to be logged in to subscribe!
          </Typography>
        </>
      );
    }

    if (ctx?.subscribed) {
      return (
        <>
          <Typography gutterBottom variant="h3">
            You're subsribed!
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography gutterBottom variant="subtitle1">
            We are a virtual cannabis club. In order to use any of the services
            Potluck offers, you need to be a subsribed member. Our membership is
            a monthly fee of $9.99. You are free to cancel at any time. Our fee
            may change in the future. Early subscribers are guaranteed to keep
            their plans forever.
          </Typography>
        </>
      );
    }
  }

  return (
    <Dialog
      open={ctx?.subscribeDialogActive ?? false}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscription</DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleCloseDialog();
          }}
          color="primary"
          variant="contained"
        >
          Close
        </Button>

        {ctx?.authenticated && (
          <>
            <Button onClick={handleClick} color="secondary" variant="contained">
              Subscribe
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
