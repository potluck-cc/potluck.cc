import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import MailIcon from "@material-ui/icons/Mail";
import appcontext from "../appcontext";
import { goToBilling } from "graphql/mutations";

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
        {ctx?.dynamoUser?.stripeCustomerId && (
          <ListItem
            button
            onClick={() => {
              if (ctx.dynamoUser) {
                goToBilling({ customerId: ctx.dynamoUser.stripeCustomerId });
              }
            }}
          >
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary="Billing" />
          </ListItem>
        )}

        {!ctx?.subscribed && (
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
        )}

        <ListItem
          button
          onClick={() => {
            window.location.href = "mailto:potluckcc@gmail.com";
          }}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
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
