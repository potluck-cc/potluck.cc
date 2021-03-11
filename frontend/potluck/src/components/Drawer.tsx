import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import appcontext from "../appcontext";

const Tabs = [
  {
    label: "Subscription",
  },
];

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer({
  open = false,
  closeDrawer = () => {},
}) {
  const ctx = useContext(appcontext);
  const classes = useStyles();
  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={closeDrawer}
      onKeyDown={closeDrawer}
    >
      <List>
        <ListItem
          button
          onClick={() => {
            ctx?.setSubscribeDialogActive(true);
          }}
        >
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText primary="Subscription" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={closeDrawer}>
        {list()}
      </Drawer>
    </div>
  );
}
