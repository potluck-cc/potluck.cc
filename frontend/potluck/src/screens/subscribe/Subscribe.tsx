import React, { useContext, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Cards from "react-credit-cards";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import appcontext from "../../appcontext";
import "react-credit-cards/es/styles-compiled.css";
import { subscribe, cancelSubscription } from "./functions";

export default function () {
  const ctx = useContext(appcontext);
  const [state, setState] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
    focus: undefined,
  });

  function handleCloseDialog() {
    ctx?.setSubscribeDialogActive(false);
  }

  function handleChange(key: string, value: string) {
    setState((currState) => ({
      ...currState,
      [key]: value,
    }));
  }

  function handleFocus(event: any) {
    setState((currState) => ({ ...currState, focus: event.target.name }));
  }

  async function handleSubscribe() {
    if (ctx?.subscribed) {
      const cancelled = await cancelSubscription();

      if (cancelled) {
        ctx?.isSubscribed(false);
      } else {
        console.log("something went wrong");
      }
    } else {
      const subscription = await subscribe();

      if (subscription) {
        ctx?.isSubscribed(true);
      } else {
        console.log("something went wrong");
      }
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

          <Cards
            cvc={state.cvc}
            expiry={state.expiry}
            focused={state.focus}
            name={state.name}
            number={state.number}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <TextField
              variant="outlined"
              label="number"
              placeholder="number"
              onChange={(event) => handleChange("number", event.target.value)}
              onFocus={handleFocus}
              name="number"
              style={{
                margin: 8,
              }}
            />

            <TextField
              variant="outlined"
              label="name"
              placeholder="name"
              onChange={(event) => handleChange("name", event.target.value)}
              onFocus={handleFocus}
              name="name"
              style={{
                margin: 8,
              }}
            />

            <TextField
              variant="outlined"
              label="expiry"
              placeholder="expiry"
              onChange={(event) => handleChange("expiry", event.target.value)}
              onFocus={handleFocus}
              name="expiry"
              style={{
                margin: 8,
              }}
            />

            <TextField
              variant="outlined"
              label="cvc"
              placeholder="cvc"
              onChange={(event) => handleChange("cvc", event.target.value)}
              onFocus={handleFocus}
              name="cvc"
              style={{
                margin: 8,
              }}
            />
          </div>
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
          <Button
            onClick={handleSubscribe}
            color="secondary"
            variant="contained"
          >
            {ctx?.subscribed ? "Cancel Subscription" : "Subscribe"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
