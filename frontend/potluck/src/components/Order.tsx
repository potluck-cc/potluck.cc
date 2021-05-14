import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import appcontext from "appcontext";
import { MenuItem as MenuItemType } from "types";
import { sendEmail } from "graphql/mutations";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const merch = ["small", "medium", "large", "xlarge"];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      maxWidth: 420,
    },
  },
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
    maxWidth: 420,
    "& > *": {
      margin: 4,
    },
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  input: {
    margin: 6,
  },
}));

export type Order = {
  name: string;
  city: string;
  phone: string;
  businessEmail: string;
  gifts: string[];
  preferredStrain: string[];
  quantity: string;
};

const defaultState = {
  name: "",
  city: "",
  phone: "",
  paymentMethod: "",
  quantity: "",
};

export default function ({
  menu,
  businessEmail,
}: {
  menu?: MenuItemType[];
  businessEmail?: string;
}) {
  const ctx = useContext(appcontext);
  const classes = useStyles();
  const [selectedGift, setSelectedGift] = useState<string[]>([]);
  const [selectedStrain, setSelectedStrain] = useState<string[]>([]);
  const [state, setState] = useState(defaultState);
  const [error, setError] = useState("");
  const [submissionSent, setSubmissionSent] = useState(false);

  const handleChange = (
    event: any,
    type: "merch" | "gift" | "preferredStrain"
  ) => {
    if (type === "preferredStrain") {
      setSelectedStrain(event.target.value);
    } else {
      setSelectedGift(event.target.value);
    }
  };

  function updateForm(key: string, value: string) {
    setState((currState) => ({
      ...currState,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    if (ctx?.user || ctx?.dynamoUser) {
      if (isValid()) {
        if (businessEmail) {
          const formValues: Order = {
            ...state,
            gifts: selectedGift,
            preferredStrain: selectedStrain,
            businessEmail: businessEmail,
          };

          const res = await sendEmail(formValues);

          if (typeof res === "boolean" && res) {
            setState(defaultState);

            setSubmissionSent(true);
          } else {
            setError("Something went wrong. Please try again.");
          }
        }
      } else {
        setError("All fields need to be filled out.");
      }
    } else {
      ctx?.setAuthDialogActive(true);
      setError("You need to be logged in to make an order.");
    }
  }

  function isValid(): boolean {
    const { name, city, phone, paymentMethod, quantity } = state;

    const allFieldsDirty =
      name.length > 0 &&
      city.length > 0 &&
      phone.length > 0 &&
      paymentMethod.length > 0 &&
      selectedGift.length > 0 &&
      selectedStrain.length > 0 &&
      quantity.length > 0;
    if (allFieldsDirty) {
      return true;
    } else {
      return false;
    }
  }

  if (!ctx?.subscribed) {
    return (
      <div style={{ padding: 20, textAlign: "center", maxWidth: 420 }}>
        <Typography gutterBottom variant="h4">
          You have to subscribe to see this page.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => ctx?.setSubscribeDialogActive(true)}
        >
          subscribe
        </Button>
      </div>
    );
  }

  if (submissionSent) {
    return (
      <div className={classes.root} style={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h5">
          Thanks for using Potluck!
        </Typography>

        <Typography gutterBottom variant="h5">
          Your submission has been sent off! Please wait for the gift shop to
          reach out to you!
        </Typography>
      </div>
    );
  }

  const defaultMenu: string[] = [];

  const flatMenu =
    menu &&
    menu.reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue.items);
    }, defaultMenu);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Typography gutterBottom variant="h5">
        Delivery Info
      </Typography>

      <div className={classes.formGroup}>
        <TextField
          className={classes.input}
          label="Name"
          variant="outlined"
          placeholder="Name"
          onChange={(event) => updateForm("name", event.target.value)}
          error={!!error}
        />

        <TextField
          className={classes.input}
          label="City"
          variant="outlined"
          placeholder="City"
          onChange={(event) => updateForm("city", event.target.value)}
          error={!!error}
        />
      </div>

      <div className={classes.formGroup}>
        <TextField
          className={classes.input}
          label="Payment Method"
          variant="outlined"
          placeholder="Cash, Cash App, etc."
          onChange={(event) => updateForm("paymentMethod", event.target.value)}
          error={!!error}
        />

        <TextField
          className={classes.input}
          label="Phone"
          variant="outlined"
          placeholder="Phone"
          onChange={(event) => updateForm("phone", event.target.value)}
          error={!!error}
        />
      </div>

      <Typography gutterBottom variant="h5" component="h2">
        Gift
      </Typography>

      <div className={classes.formGroup} style={{ flexDirection: "column" }}>
        <FormControl className={classes.formControl}>
          <InputLabel>Preferred Gift</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedGift}
            onChange={(event) => handleChange(event, "gift")}
            input={<Input id="select-multiple-chip" />}
            renderValue={() => (
              <div className={classes.chips}>
                {selectedGift.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
            error={!!error}
          >
            {menu?.map((gift) => (
              <MenuItem key={gift.title} value={gift.title}>
                {gift.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Preferred Strain</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedStrain}
            onChange={(event) => handleChange(event, "preferredStrain")}
            input={<Input id="select-multiple-chip" />}
            renderValue={() => (
              <div className={classes.chips}>
                {selectedStrain?.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
            error={!!error}
          >
            {flatMenu?.map((strain) => (
              <MenuItem key={strain} value={strain}>
                {strain}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div style={{ width: "100%" }}>
        <TextField
          label="Quantity"
          variant="outlined"
          onChange={(event) => updateForm("quantity", event.target.value)}
          error={!!error}
          style={{ width: "100%" }}
        />
      </div>

      {error && <Typography style={{ color: "red" }}>{error}</Typography>}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ width: "100%" }}
      >
        Submit
      </Button>
    </form>
  );
}
