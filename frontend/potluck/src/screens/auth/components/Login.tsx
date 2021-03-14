import React, { useContext, useState } from "react";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Auth } from "aws-amplify";
import { AuthState } from "../types";
import AuthContext from "../authcontext";
import AppContext from "../../../appcontext";
import { handleLogin } from "../functions";

export default function () {
  const appctx = useContext(AppContext);
  const ctx = useContext(AuthContext);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | undefined>(undefined);

  function updateState(key: string, value: string) {
    setState((currState) => ({ ...currState, [key]: value }));
  }

  function isValid({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }): boolean {
    if (email) {
      return email.length > 0;
    }

    if (password) {
      return password.length > 0;
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

      <div>
        <Input
          placeholder="Enter your password"
          error={!!error}
          // validator={() =>
          //   isValid({
          //     password: state.password,
          //   })
          // }
          onChange={(event) => updateState("password", event.target.value)}
          type="password"
          className="auth__input"
        />
      </div>

      {error && <Typography style={{ color: "red" }}>{error}</Typography>}

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleLogin({
              username: state.email,
              password: state.password,
              onSuccess: async (res) => {
                if (res.challengeName === "NEW_PASSWORD_REQUIRED") {
                  await Auth.completeNewPassword(res, state.password, null);

                  setError(
                    "Please go to forgot password and change your password"
                  );
                } else {
                  appctx?.isAuthenticated(true);
                  appctx?.setAuthDialogActive(false);
                }
              },
              onFail: (err) => {
                if (err && err.message) {
                  setError(err.message);
                }
              },
            });
          }}
        >
          Login
        </Button>
      </div>

      <Button
        onClick={() => {
          ctx?.setAuthState(AuthState.ForgotPassword);
        }}
      >
        <Typography>Forgot password</Typography>
      </Button>
    </div>
  );
}
