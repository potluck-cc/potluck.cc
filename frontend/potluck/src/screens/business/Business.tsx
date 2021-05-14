import React, { useEffect, useState, useContext } from "react";
import { Profile, Tabs, Menu, Order, Questions } from "components";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Business } from "types";
import Button from "@material-ui/core/Button";
import ProfileDialog from "./ProfileDialog";
import "./business.scss";
import { fetchBusinessWithSlug } from "graphql/queries";
import { updateBusiness as updateBusinessAPI } from "graphql/mutations";
import appcontext from "appcontext";
import Reviews from "./Reviews";

export default function () {
  const [tabState, updateTabState] = useState(0);
  const [business, setBusiness] = useState<undefined | Business>(undefined);
  const [profileDialogActive, setProfileDialog] = useState(false);
  const [orderFormToggled, toggleOrderForm] = useState(false);
  const ctx = useContext(appcontext);
  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    if (location.state) {
      // @ts-ignore
      setBusiness(location.state.business as Business);
    }

    // @ts-ignore
    const business = await fetchBusinessWithSlug(params?.slug);
    setBusiness(business);
  }

  function isBusiness(cognitoUser: any) {
    if (cognitoUser) {
      return (
        cognitoUser?.signInUserSession?.accessToken?.payload[
          "cognito:groups"
        ]?.includes("Business") && cognitoUser.attributes.sub === business?.id
      );
    } else return false;
  }

  async function updateBusiness(items: {
    flower?: string;
    edibles?: string;
    concentrates?: string;
    description?: string;
  }) {
    const businessCopy = { ...business };

    if (businessCopy) {
      businessCopy.menu = [];
      //@ts-ignore
      Object.keys(items).map((key) => {
        if (key !== "description") {
          //@ts-ignore
          const menuStr = items[key];

          if (menuStr) {
            businessCopy?.menu?.push({
              title: key,
              items: menuStr.split(" / "),
            });
          }
        }
      });

      const updatedBusiness = {
        ...businessCopy,
        id: businessCopy.id ?? "",
        description: items.description ?? "",
      };

      //@ts-ignore
      updateBusinessAPI(updatedBusiness);
      setBusiness(updatedBusiness as Business);
      //@ts-ignore
      history.location.state = {
        business: updatedBusiness,
      };
    }
  }

  function renderTab() {
    switch (tabState) {
      case 0:
        return (
          <Menu
            menu={business?.menu}
            businessEmail={business?.email}
            orderFormToggled={orderFormToggled}
            toggleOrderForm={toggleOrderForm}
          />
        );
      case 1:
        return <Reviews businessId={business?.id} />;
      case 2:
        return <Questions description={business?.description} />;
      default:
        return null;
    }
  }

  return (
    <div className="business">
      <Profile business={business} />

      {isBusiness(ctx?.user) ? (
        <Button
          size="small"
          color="secondary"
          variant="contained"
          style={{ marginBottom: 8 }}
          onClick={() => setProfileDialog(true)}
        >
          Edit Profile
        </Button>
      ) : (
        <Button
          size="large"
          color="primary"
          variant="contained"
          style={{ marginBottom: 8 }}
          onClick={() => {
            updateTabState(0);
            toggleOrderForm(!orderFormToggled);
          }}
        >
          {!orderFormToggled ? "Order" : "Menu"}
        </Button>
      )}

      <Tabs
        onSetValue={updateTabState}
        activeTab={tabState === 0 ? 0 : undefined}
        orderFormToggled={orderFormToggled}
      />

      {renderTab()}

      <ProfileDialog
        open={profileDialogActive}
        handleCloseDialog={() => setProfileDialog(false)}
        menu={business?.menu}
        updateBusiness={updateBusiness}
        description={business?.description ?? ""}
      />
    </div>
  );
}
