import React, { useContext, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import appcontext from "appcontext";
import { Login, ForgotPassword, Signup, Confirm } from "./components";
import { AuthState } from "./types";
import AuthContext from "./authcontext";
import "./auth.scss";

type AuthProps = {
  state?: AuthState;
};

function renderLayout(authState: AuthState) {
  switch (authState) {
    case AuthState.Login:
      return <Login />;

    case AuthState.ForgotPassword:
      return <ForgotPassword />;

    case AuthState.Signup:
      return <Signup />;

    case AuthState.ConfirmPassword:
      return <Confirm />;

    default:
      return <Login />;
  }
}

export default function Layout({ state }: AuthProps) {
  const ctx = useContext(appcontext);
  const [authState, setAuthState] = useState(state ? state : AuthState.Login);

  function handleCloseDialog() {
    ctx?.setAuthDialogActive(false);
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
      }}
    >
      <Dialog
        open={ctx?.authDialogActive ?? false}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{authState}</DialogTitle>
        <DialogContent>
          <div className="auth">{renderLayout(authState)}</div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog();
              setAuthState(AuthState.Login);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => setAuthState(AuthState.Signup)}
            color="primary"
          >
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </AuthContext.Provider>
  );
}
