import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { MenuItem as MenuItemType } from "types";

type ProfileDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
  menu: MenuItemType[] | undefined;
  description: string;
  deliveryLocations: string[];
  updateBusiness: (items: {
    flower?: string;
    edibles?: string;
    concentrates?: string;
    description?: string;
    deliveryLocations?: string[];
  }) => void;
};

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

const counties = [
  "atlantic",
  "bergen",
  "burlington",
  "camden",
  "capemay",
  "cumberland",
  "essex",
  "gloucester",
  "hudson",
  "hunterdon",
  "mercer",
  "middlesex",
  "monmouth",
  "morris",
  "ocean",
  "passaic",
  "salem",
  "somerset",
  "sussex",
  "union",
  "warren",
];

export default function ({
  open = false,
  handleCloseDialog = () => {},
  menu,
  updateBusiness,
  description,
  deliveryLocations,
}: ProfileDialogProps) {
  const [state, setState] = useState({
    premiums: undefined,
    exotics: undefined,
    description,
  });

  const classes = useStyles();

  const [selectedCounties, selectCounty] =
    useState<string[]>(deliveryLocations);

  useEffect(() => {
    selectCounty(deliveryLocations);
  }, [deliveryLocations]);

  useEffect(() => {
    initFormValues();
  }, [menu]);

  useEffect(() => {
    handleChange("description", description);
  }, [description]);

  function handleSubmit() {
    updateBusiness({
      ...state,
      deliveryLocations: selectedCounties,
    });
    handleCloseDialog();
  }

  function handleChange(key: string, value: string) {
    setState((currState) => ({ ...currState, [key]: value }));
  }

  function renderForm() {
    return Object.keys(state).map((item) => {
      if (item === "description") return null;

      return (
        <Input
          placeholder={item}
          onChange={(event) => handleChange(item, event.target.value)}
          //@ts-ignore
          value={state[item]}
          style={{
            margin: 10,
          }}
        />
      );
    });
  }

  function initFormValues() {
    menu?.forEach((item) => {
      handleChange(item.title, item.items.join(" / "));
    });
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: 420,
            minWidth: 420,
          }}
        >
          {renderForm()}

          <Input
            placeholder={
              state.description.length ? state.description : "Your rules here."
            }
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            value={state.description}
            multiline
            style={{
              margin: 10,
            }}
          />

          <FormControl className={classes.formControl}>
            <InputLabel>Delivery Locations</InputLabel>
            <Select
              multiple
              value={selectedCounties}
              //@ts-ignore
              onChange={(event) => selectCounty(event.target.value)}
              input={<Input id="select-multiple-chip" />}
              renderValue={() => (
                <div className={classes.chips}>
                  {selectedCounties.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {counties?.map((county) => (
                <MenuItem key={county} value={county}>
                  {county}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleCloseDialog();
          }}
          color="primary"
        >
          Cancel
        </Button>

        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
