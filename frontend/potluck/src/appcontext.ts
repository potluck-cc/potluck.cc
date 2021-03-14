import { User } from "graphql/queries";
import { createContext, Dispatch } from "react";

export interface AppContextInterface {
  authDialogActive: boolean;
  subscribeDialogActive: boolean;
  setSubscribeDialogActive: Dispatch<React.SetStateAction<boolean>>;
  setAuthDialogActive: Dispatch<React.SetStateAction<boolean>>;
  authenticated: boolean;
  isAuthenticated: Dispatch<React.SetStateAction<boolean>>;
  subscribed: boolean;
  isSubscribed: Dispatch<React.SetStateAction<boolean>>;
  user: null | any;
  dynamoUser: null | User;
}

export default createContext<AppContextInterface | null>(null);
