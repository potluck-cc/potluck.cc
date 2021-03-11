import React from "react";
import Avatar from "./components/Avatar";
import Typography from "@material-ui/core/Typography";
import { Business } from "types";
import "./profile.scss";

export default function ({ business }: { business?: Business }) {
  function getBusinessStats() {
    const menu = business?.menu;

    const stats = menu?.map((item) => ({
      title: item.title,
      count: item.items.length,
    }));

    return stats;
  }

  function renderStats() {
    const stats = getBusinessStats();

    return stats?.map((stat) => (
      <div className="profile__topbar__blurb">
        <Typography gutterBottom variant="h5">
          {stat.count}
        </Typography>
        <Typography gutterBottom variant="h6">
          {stat.title === "flower" ? "strains" : stat.title}
        </Typography>
      </div>
    ));
  }

  return (
    <div className="profile">
      <div className="profile__topbar">
        <Avatar src={business?.avatar} />

        <div className="profile__topbar__blurbs">{renderStats()}</div>
      </div>

      <div className="profile__description">
        <Typography gutterBottom variant="h5" component="h2">
          {business?.title}
        </Typography>
      </div>
    </div>
  );
}
