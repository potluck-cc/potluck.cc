import { Auth } from "aws-amplify";

export interface UserAttributes {
  sub: string;
  email: string;
  email_verified: string;
  name: string;
  updated_at: string;
}
export type CognitoUser = {
  Session: any;
  attributes: UserAttributes;
  authenticationFlowType: string;
  client: any;
  keyPrefix: string;
  pool: any;
  preferredMFA: string;
  signInUserSession: any;
  storage: any;
  userDataKey: string;
  username: string;
};

export type AuthError = {
  log: string;
  name: string;
  message: string;
  stack: string;
};

export function isError(
  response: CognitoUser | AuthError
): response is AuthError {
  if ((response as AuthError).message) {
    return true;
  } else {
    return false;
  }
}

export type OnSuccess<ResponseType = any> = (response: ResponseType) => void;
export type OnFail = (error: AuthError, authType: string) => void;
export type HandleError = (error: AuthError, cb: Function) => void;

const defaultOnSuccess = (response: any) => console.log(response);
const defaultOnFail = (error: AuthError, errorType: string) =>
  console.log(`${error} of ${errorType}`);

export const handleError: HandleError = (error, cb) => {
  let errorType: string = typeof error;
  cb(error, errorType);
};

export async function handleAuthOperation(
  operation: () => any,
  onSuccess: OnSuccess = defaultOnSuccess,
  onFail: OnFail = defaultOnFail
) {
  try {
    const response = await operation();
    await onSuccess(response);
  } catch (e) {
    await handleError(e, onFail);
  }
}

export async function handleLogin({
  username,
  password,
  onSuccess = defaultOnSuccess,
  onFail = defaultOnFail,
}: {
  username: string;
  password: string;
  onSuccess: OnSuccess<CognitoUser | any>;
  onFail: OnFail;
}) {
  try {
    const res = await Auth.signIn(username, password);
    onSuccess(res);
  } catch (e) {
    await handleError(e, onFail);
  }
}

export function handleSignUp({
  username,
  password,
  onSuccess = defaultOnSuccess,
  onFail = defaultOnFail,
}: {
  username: string;
  password: string;
  onSuccess: OnSuccess;
  onFail: OnFail;
}): void {
  const signUp = () => Auth.signUp({ username, password });
  handleAuthOperation(signUp, onSuccess, onFail);
}

export function handleConfirmAccount({
  username,
  code,
  onSuccess = defaultOnSuccess,
  onFail = defaultOnFail,
}: {
  username: string;
  password: string;
  code: string;
  onSuccess: OnSuccess;
  onFail: OnFail;
}): void {
  const confirmAccount = () => Auth.confirmSignUp(username, code);
  handleAuthOperation(confirmAccount, onSuccess, onFail);
}

export function handleResendConfirmationEmail({
  username,
  onSuccess = defaultOnSuccess,
  onFail = defaultOnFail,
}: {
  username: string;
  onSuccess: OnSuccess;
  onFail: OnFail;
}): void {
  const resendConfirmationEmail = () => Auth.resendSignUp(username);
  handleAuthOperation(resendConfirmationEmail, onSuccess, onFail);
}

export function handleForgotPasswordRequest({
  username,
  onSuccess = defaultOnSuccess,
  onFail = defaultOnFail,
}: {
  username: string;
  onSuccess: OnSuccess;
  onFail: OnFail;
}): void {
  const forgotPasswordRequest = () => Auth.forgotPassword(username);
  handleAuthOperation(forgotPasswordRequest, onSuccess, onFail);
}

export function handleConfirmPasswordChange({
  username,
  password,
  code,
  onSuccess = defaultOnSuccess,
  onFail = defaultOnFail,
}: {
  username: string;
  password: string;
  code: string;
  onSuccess: OnSuccess;
  onFail: OnFail;
}): void {
  const confirmPasswordChange = () =>
    Auth.forgotPasswordSubmit(username, code, password);
  handleAuthOperation(confirmPasswordChange, onSuccess, onFail);
}

export function handleChangeAttribute({
  attributes,
  user,
  onSuccess = defaultOnSuccess,
  onFail = defaultOnFail,
}: {
  user: any;
  attributes: any;
  onSuccess: OnSuccess;
  onFail: OnFail;
}): void {
  const changeAttribute = () => Auth.updateUserAttributes(user, attributes);
  handleAuthOperation(changeAttribute, onSuccess, onFail);
}

export function handleVerifyChangeAttribute({
  attribute,
  code,
  onSuccess = defaultOnSuccess,
  onFail = defaultOnFail,
}: {
  attribute: any;
  code: string;
  onSuccess: OnSuccess;
  onFail: OnFail;
}): void {
  const verifyAttribute = () =>
    Auth.verifyCurrentUserAttributeSubmit(attribute, code);
  handleAuthOperation(verifyAttribute, onSuccess, onFail);
}

// helpers

export function americanizePhoneNumber(phonenumber: string): string {
  if (phonenumber[0] === "+" && phonenumber[1] === "1") {
    return phonenumber;
  } else {
    return `+1${phonenumber}`;
  }
}

export function normalizePhoneStringInput(str: string): string {
  return str.trim().replace(/[\s()-]+/gi, "");
}

export function normalizePhone(phoneNumber: string): string {
  phoneNumber = phoneNumber.replace(/\+1/g, "");
  phoneNumber = phoneNumber.replace(/-/g, "");
  phoneNumber = phoneNumber.replace(/\)/g, "");
  phoneNumber = phoneNumber.replace(/\(/g, "");
  phoneNumber = phoneNumber.replace(/ /g, "");
  if (phoneNumber.length === 10) {
    // Note 1 is for USA this needs localization
    // TODO(localization)
    phoneNumber = `+1${phoneNumber}`;
  } else {
    phoneNumber = `+${phoneNumber}`;
  }
  return phoneNumber;
}
