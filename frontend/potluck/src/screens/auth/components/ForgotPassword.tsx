import React, { useContext, useState } from "react";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AuthState } from "../types";
import AuthContext from "../authcontext";
import AppContext from "appcontext";
import { handleForgotPasswordRequest } from "../functions";

export default function () {
  const ctx = useContext(AuthContext);
  const appctx = useContext(AppContext);
  const [state, setState] = useState({
    email: "",
  });

  const [error, setError] = useState<string | undefined>(undefined);

  function forgotPassword() {
    handleForgotPasswordRequest({
      username: state.email,
      onSuccess: () => {
        ctx?.setAuthState(AuthState.ConfirmPassword);
      },
      onFail: (err) => {
        if (err && err.message) {
          setError(err.message);
        }
      },
    });
  }

  function updateState(key: string, value: string) {
    setState((currState) => ({ ...currState, [key]: value }));
  }

  function isValid({ phone }: { phone?: string; password?: string }): boolean {
    if (phone) {
      return phone.length > 0;
    }

    return false;
  }

  return (
    <div className="auth__form">
      <div>
        <Input
          placeholder="Enter your email"
          error={!!error}
          onChange={(event) => updateState("email", event.target.value)}
          className="auth__input"

          // validator={() =>
          //   isValid({
          //     phone: state.phone,
          //   })
          // }
        />
      </div>

      {error && <Typography style={{ color: "red" }}>{error}</Typography>}

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            forgotPassword();
          }}
        >
          Reset your password
        </Button>
      </div>

      <Button
        onClick={() => {
          ctx?.setAuthState(AuthState.Login);
        }}
      >
        <Typography>Login</Typography>
      </Button>
    </div>
  );
}
