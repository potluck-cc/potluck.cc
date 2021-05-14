import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from "aws-amplify";
import appcontext from "../appcontext";
import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 900,
  },
}));

export default function () {
  const ctx = useContext(appcontext);
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleClick() {
    if (ctx?.authenticated) {
      Auth.signOut();
      ctx?.isAuthenticated(false);
      ctx?.setUser(null);
    } else {
      ctx?.setAuthDialogActive(true);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon htmlColor="white" />
          </IconButton>

          <Button
            onClick={() => window.location.replace("/")}
            className={classes.title}
          >
            <Typography variant="h6" style={{ color: "white" }}>
              pot<span style={{ color: "#204b2b" }}>luck</span>
            </Typography>
          </Button>

          <Button onClick={handleClick} style={{ color: "white" }}>
            {ctx?.authenticated ? "logout" : "login"}
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} closeDrawer={() => setDrawerOpen(false)} />
    </div>
  );
}
