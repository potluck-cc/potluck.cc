import React, { useContext, useState } from "react";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AuthState } from "../types";
import AuthContext from "../authcontext";
import AppContext from "../../../appcontext";
import { handleConfirmPasswordChange } from "../functions";

export default function () {
  const ctx = useContext(AuthContext);

  const [state, setState] = useState({
    email: "",
    password: "",
    code: "",
  });

  const [error, setError] = useState<string | undefined>(undefined);

  function updateState(key: string, value: string) {
    setState((currState) => ({ ...currState, [key]: value }));
  }

  function confirmPasswordChange() {
    handleConfirmPasswordChange({
      username: state.email,
      password: state.password,
      code: state.code,
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
    code,
  }: {
    phone?: string;
    password?: string;
    code?: string;
  }): boolean {
    if (phone) {
      return phone.length > 0;
    }

    if (password) {
      return password.length > 0;
    }

    if (code) {
      return code.length > 0;
    }

    return false;
  }

  return (
    <div>
      <div>
        <Input
          placeholder="Enter your email"
          error={!!error}
          onChange={(event) => updateState("email", event.target.value)}
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
        />
      </div>

      <div>
        <Input
          placeholder="code"
          error={!!error}
          // validator={() =>
          //   isValid({
          //     password: state.password,
          //   })
          // }
          onChange={(event) => updateState("code", event.target.value)}
          type="password"
        />
      </div>

      {error && <Typography>{error}</Typography>}

      <div>
        <Button
          onClick={() => {
            confirmPasswordChange();
          }}
        >
          Confirm
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
