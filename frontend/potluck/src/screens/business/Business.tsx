import React, { useEffect, useState, useContext } from "react";
import { Profile, Tabs, Menu, Order, Questions } from "components";
import { useLocation, useParams } from "react-router-dom";
import { Business } from "types";
import Button from "@material-ui/core/Button";
import ProfileDialog from "./ProfileDialog";
import "./business.scss";
import { fetchBusinessWithSlug } from "graphql/queries";
import { updateBusiness as updateBusinessAPI } from "graphql/mutations";
import appcontext from "appcontext";

export default function () {
  const [tabState, updateTabState] = useState(0);
  const [business, setBusiness] = useState<undefined | Business>(undefined);
  const [profileDialogActive, setProfileDialog] = useState(false);
  const ctx = useContext(appcontext);
  const params = useParams();
  const location = useLocation();

  console.log(business);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    if (location.state) {
      // @ts-ignore
      setBusiness(location.state.business as Business);
    } else {
      // @ts-ignore
      const business = await fetchBusinessWithSlug(params?.slug);
      setBusiness(business);
    }
  }

  function isBusiness(user: any) {
    if (user) {
      return user?.signInUserSession?.accessToken?.payload[
        "cognito:groups"
      ]?.includes("Business");
    } else return false;
  }

  async function updateBusiness(items: {
    flower?: string;
    edibles?: string;
    concentrates?: string;
    description?: string;
  }) {
    const updatedBusiness = { ...business };

    if (updatedBusiness) {
      updatedBusiness.menu = [];
      //@ts-ignore
      Object.keys(items).map((key) => {
        //@ts-ignore
        const menuStr = items[key];

        if (menuStr) {
          updatedBusiness?.menu?.push({
            title: key,
            items: menuStr.split(" / "),
          });
        }
      });

      updateBusinessAPI({
        id: updatedBusiness.id ?? "",
        description: updatedBusiness.description ?? "",
        menu: updatedBusiness.menu,
      });

      setBusiness(updatedBusiness as Business);
    }
  }

  function renderTab() {
    switch (tabState) {
      case 0:
        return (
          <Menu data={business?.menu} description={business?.description} />
        );
      case 1:
        return <Order menu={business?.menu} businessEmail={business?.email} />;
      case 2:
        return <Questions />;
      default:
        return null;
    }
  }

  return (
    <div className="business">
      <Profile business={business} />

      {isBusiness(ctx?.user) && (
        <Button
          size="small"
          color="secondary"
          variant="contained"
          style={{ marginBottom: 8 }}
          onClick={() => setProfileDialog(true)}
        >
          Edit Profile
        </Button>
      )}

      <Tabs onSetValue={updateTabState} />

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
