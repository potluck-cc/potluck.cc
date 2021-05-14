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
  setdynamoUser: Dispatch<React.SetStateAction<User | null>>;
}

export default createContext<AppContextInterface | null>(null);
