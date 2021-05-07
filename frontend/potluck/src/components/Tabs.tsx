import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    width: "80%",
  },
});

export default function CenteredTabs({
  onSetValue = () => {},
  activeTab = undefined,
  orderFormToggled,
}: {
  onSetValue: (value: number) => void;
  activeTab?: undefined | number;
  orderFormToggled?: boolean;
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    onSetValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={activeTab !== undefined ? activeTab : value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label={orderFormToggled ? "Order" : "Menu"} />
        <Tab label="Reviews" />
        <Tab label="About" />
      </Tabs>
    </Paper>
  );
}
