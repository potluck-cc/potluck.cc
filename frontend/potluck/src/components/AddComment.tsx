import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { GenericDialog } from "components";
import TextField from "@material-ui/core/TextField";
import appcontext from "appcontext";
import { updateUser as updateUserMutation } from "graphql/mutations";
import { User } from "graphql/queries";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 420,
    minWidth: 420,
    marginBottom: 8,
  },
  cardContent: {
    padding: "0 !important",
    display: "flex",
    position: "relative",
  },
  textarea: {
    margin: 0,
    minHeight: 60,
    height: "100%",
    width: "100%",
    border: "none",
    outline: "none !important",
    paddingLeft: 15,
    paddingTop: 15,
    fontFamily: "CircularSTD-Book",
    fontSize: 16,
  },
  cardActions: {
    justifyContent: "flex-end",
  },
}));

const defaultText = "";

export default function AddComment({
  onShare,
  disabled,
}: {
  onShare: (text: string) => void;
  disabled: boolean;
}) {
  const ctx = useContext(appcontext);
  const classes = useStyles();
  const [dialogOpen, isDialogOpen] = useState(false);
  const [text, updateText] = useState(defaultText);
  const [username, setUsername] = useState("");

  function share() {
    if (ctx?.dynamoUser?.username) {
      onShare(text);
      updateText(defaultText);
    } else {
      isDialogOpen(true);
    }
  }

  async function saveUsername() {
    const updatedUser = await updateUserMutation({
      id: ctx?.dynamoUser?.id ?? ctx?.user.username,
      username,
    });

    console.log(updatedUser);

    ctx?.setdynamoUser(updatedUser as User);

    isDialogOpen(false);
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardContent}>
        <textarea
          className={classes.textarea}
          onChange={(e) => updateText(e.target.value)}
          value={text}
          placeholder="How was your order?"
        ></textarea>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={disabled ? () => ctx?.setAuthDialogActive(true) : share}
        >
          {disabled ? "Login To Leave a Review" : "Share"}
        </Button>
      </CardActions>

      <GenericDialog
        title="Choose a Username"
        content={
          <TextField
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        }
        onClose={() => isDialogOpen(false)}
        action={{
          title: "Save Username",
          onClick: () => saveUsername(),
        }}
        dialogOpen={dialogOpen}
      />
    </Card>
  );
}
