import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: 100,
    height: 100,
  },
}));

export default function AvatarComponent({ alt = "", src = "" }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={alt} src={src} className={classes.large} />
    </div>
  );
}
