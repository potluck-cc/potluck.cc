import React, { useMemo, useState, useEffect } from "react";
import { Topbar, GenericDialog } from "components";
import { Discover } from "screens/discover";
import { Business } from "screens/business";
import { Auth } from "screens/auth";
import { Subscribe } from "screens/subscribe";
import { Success } from "screens/stripe";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Amplify, { Auth as AmplifyAuth } from "aws-amplify";
import AppContext from "./appcontext";
import { getUser, User } from "graphql/queries";

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_3NAAjhsu9",
    userPoolWebClientId: "5kg5lrn3atvlrcniudiv8a5c9",
  },
  API: {
    aws_appsync_graphqlEndpoint:
      "https://ckjug44esfctxapr76ydza3cmm.appsync-api.us-east-1.amazonaws.com/graphql",
    aws_appsync_region: "us-east-1",
    aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
    aws_appsync_apiKey: "da2-7djdldvmu5gxppwhri6ispd3sa",
  },
});

function App() {
  const darkMode = false;
  const [authDialogActive, setAuthDialogActive] = useState(false);
  const [subscribeDialogActive, setSubscribeDialogActive] = useState(false);
  const [authenticated, isAuthenticated] = useState(false);
  const [subscribed, isSubscribed] = useState(false);
  const [user, setUser] = useState(null);
  const [dynamoUser, setdynamoUser] = useState<User | null>(null);
  const [initialized, isInitialized] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const user = await AmplifyAuth.currentAuthenticatedUser();

      if (user) {
        setUser(user);
        isAuthenticated(true);
        const dynamoUser = await getUser();

        if (dynamoUser) {
          isSubscribed(dynamoUser.subscribed);
          setdynamoUser(dynamoUser);
        }
      } else {
        isAuthenticated(false);
      }

      isInitialized(true);
    } catch {
      isInitialized(true);
    }
  }

  function renderAppEntryDialog() {
    if (initialized) {
      if (!user) {
        return (
          <GenericDialog
            title="Age"
            content="You need to be 21 to use this site."
            onClose={() =>
              window.location.replace(
                "https://www.google.com/search?q=nj+marijuana+laws"
              )
            }
            action={{
              title: "I'm 21+",
            }}
          />
        );
      }

      if (dynamoUser && dynamoUser.subscribed === null) {
        return (
          <GenericDialog
            title="Error"
            content="We had trouble loading your subscrition details from stripe. Please try refreshing."
            action={{
              title: "Refresh",
              onClick: () => window.location.reload(),
            }}
          />
        );
      }
    }
  }

  const theme = useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontFamily: ["CircularSTD-Book"].join(","),
          h3: {
            fontFamily: "LemonMilk",
          },
        },
        palette: {
          primary: {
            main: "#46b060",
            contrastText: "#fff",
          },
          secondary: {
            main: "#112021",
          },
        },
      }),
    [darkMode]
  );

  return (
    <AppContext.Provider
      value={{
        authDialogActive,
        subscribeDialogActive,
        setAuthDialogActive,
        setSubscribeDialogActive,
        authenticated,
        isAuthenticated,
        subscribed,
        isSubscribed,
        user,
        dynamoUser,
      }}
    >
      <ThemeProvider theme={theme}>
        <Topbar />

        <div style={{ marginTop: 60 }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Discover} />
              <Route exact path="/:slug" component={Business} />
              <Route exact path="/success/:sessionId" component={Success} />
            </Switch>
          </Router>
        </div>

        <Auth />

        <Subscribe />

        {renderAppEntryDialog()}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
