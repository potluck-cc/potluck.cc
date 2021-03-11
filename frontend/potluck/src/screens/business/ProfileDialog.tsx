import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { MenuItem } from "types";

type ProfileDialogProps = {
  open: boolean;
  handleCloseDialog: () => void;
  menu: MenuItem[] | undefined;
  description: string;
  updateBusiness: (items: {
    flower?: string;
    edibles?: string;
    concentrates?: string;
    description?: string;
  }) => void;
};

export default function ({
  open = false,
  handleCloseDialog = () => {},
  menu,
  updateBusiness,
  description,
}: ProfileDialogProps) {
  const [state, setState] = useState({
    flower: undefined,
    edibles: undefined,
    concentrates: undefined,
    description,
  });

  useEffect(() => {
    initFormValues();
  }, [menu]);

  useEffect(() => {
    handleChange("description", description);
  }, [description]);

  function handleSubmit() {
    updateBusiness(state);
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
