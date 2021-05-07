import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { GenericDialog } from "components";
import TextField from "@material-ui/core/TextField";

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

export default function AddComment() {
  const classes = useStyles();
  const [dialogOpen, isDialogOpen] = useState(false);

  function share() {
    isDialogOpen(true);
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardContent}>
        <textarea className={classes.textarea}>Leave a review</textarea>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={share}>
          Share
        </Button>
      </CardActions>

      <GenericDialog
        title="Choose a Username"
        content={<TextField label="Username" variant="outlined" />}
        onClose={() => isDialogOpen(false)}
        action={{
          title: "Save Username",
          onClick: () => isDialogOpen(false),
        }}
        dialogOpen={dialogOpen}
      />
    </Card>
  );
}
