import React, { useContext, useState } from "react";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AuthState } from "../types";
import AuthContext from "../authcontext";
import AppContext from "../../../appcontext";
import { handleSignUp } from "../functions";

export default function () {
  const ctx = useContext(AuthContext);
  const appctx = useContext(AppContext);
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | undefined>(undefined);

  function updateState(key: string, value: string) {
    setState((currState) => ({ ...currState, [key]: value }));
  }

  function signUp() {
    handleSignUp({
      username: state.email,
      password: state.password,
      onSuccess: () => {
        ctx?.setAuthState(AuthState.Login);
      },
      onFail: (err) => {
        if (err && err.message) {
          setError(err.message);
        }
      },
    });
  }

  function isValid({
    phone,
    password,
    confirmPassword,
  }: {
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }): boolean {
    if (phone) {
      return phone.length > 0;
    }

    if (password) {
      return password.length > 0;
    }

    if (confirmPassword) {
      return confirmPassword === state.password;
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

      {/* <div>
        <Input
          placeholder="Confirm your password"
          error={!!error}
          // validator={() =>
          //   isValid({
          //     password: state.password,
          //   })
          // }
          onChange={(event) =>
            updateState("confirmPassword", event.target.value)
          }
          type="password"
          className="auth__input"
        />
      </div> */}

      {error && <Typography style={{ color: "red" }}>{error}</Typography>}

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            signUp();
          }}
        >
          Sign up
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
