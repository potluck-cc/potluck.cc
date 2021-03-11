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
      width: 420,
    },
  },
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  businessEmail: string;
  merch: string[];
  gifts: string[];
  preferredStrain: string;
  quantity: string;
};

const defaultState = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  zip: "",
  phone: "",
  paymentMethod: "",
  preferredStrain: "",
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
  const [selectedMerch, setSelectedMerch] = useState<string[]>([]);
  const [selectedGift, setSelectedGift] = useState<string[]>([]);
  const [state, setState] = useState(defaultState);
  const [error, setError] = useState(false);
  const [submissionSent, setSubmissionSent] = useState(false);

  const handleChange = (event: any, type: "merch" | "gift") => {
    if (type === "merch") {
      setSelectedMerch(event.target.value);
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

  function handleSubmit() {
    if (isValid()) {
      if (businessEmail) {
        const formValues: Order = {
          ...state,
          merch: selectedMerch,
          gifts: selectedGift,
          businessEmail: businessEmail,
        };

        sendEmail(formValues);

        setState(defaultState);

        setSubmissionSent(true);
      }
    } else {
      setError(true);
    }
  }

  function isValid(): boolean {
    const {
      firstName,
      lastName,
      address,
      city,
      zip,
      phone,
      paymentMethod,
      preferredStrain,
      quantity,
    } = state;

    const allFieldsDirty =
      firstName.length > 0 &&
      lastName.length > 0 &&
      address.length > 0 &&
      city.length > 0 &&
      zip.length > 0 &&
      phone.length > 0 &&
      paymentMethod.length > 0 &&
      selectedGift.length > 0 &&
      selectedMerch.length > 0 &&
      preferredStrain.length > 0 &&
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

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Typography gutterBottom variant="h5">
        Delivery Info
      </Typography>
      <div className={classes.formGroup}>
        <TextField
          className={classes.input}
          label="First Name"
          variant="outlined"
          placeholder="First Name"
          onChange={(event) => updateForm("firstName", event.target.value)}
          error={error}
        />
        <TextField
          className={classes.input}
          label="Last Name"
          variant="outlined"
          placeholder="Last Name"
          onChange={(event) => updateForm("lastName", event.target.value)}
          error={error}
        />
      </div>

      <div className={classes.formGroup}>
        <TextField
          className={classes.input}
          label="Address"
          variant="outlined"
          placeholder="Address"
          onChange={(event) => updateForm("address", event.target.value)}
          error={error}
        />
        <TextField
          className={classes.input}
          label="City"
          variant="outlined"
          placeholder="City"
          onChange={(event) => updateForm("city", event.target.value)}
          error={error}
        />
      </div>

      <div className={classes.formGroup}>
        <TextField
          className={classes.input}
          label="Zip"
          variant="outlined"
          placeholder="Zip"
          onChange={(event) => updateForm("zip", event.target.value)}
          error={error}
        />
        <TextField
          className={classes.input}
          label="Phone"
          variant="outlined"
          placeholder="Phone"
          onChange={(event) => updateForm("phone", event.target.value)}
          error={error}
        />
      </div>

      <Typography gutterBottom variant="h5" component="h2">
        Terra Cotta Clay Pots
      </Typography>

      <FormControl className={classes.formControl}>
        <InputLabel>Size</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={selectedMerch}
          onChange={(event) => handleChange(event, "merch")}
          input={<Input id="select-multiple-chip" />}
          renderValue={() => (
            <div className={classes.chips}>
              {selectedMerch.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
          error={error}
        >
          {merch.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography gutterBottom variant="h5" component="h2">
        Gift
      </Typography>

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
          error={error}
        >
          {menu?.map((gift) => (
            <MenuItem key={gift.title} value={gift.title}>
              {gift.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ width: "100%" }}>
        <TextField
          label="Preferred Strain"
          variant="outlined"
          onChange={(event) =>
            updateForm("preferredStrain", event.target.value)
          }
          error={error}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <TextField
          label="Quantity"
          variant="outlined"
          onChange={(event) => updateForm("quantity", event.target.value)}
          error={error}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <TextField
          label="Payment Method"
          variant="outlined"
          placeholder="Cash, Cash App"
          onChange={(event) => updateForm("paymentMethod", event.target.value)}
          error={error}
          style={{ width: "100%" }}
        />
      </div>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}
