import React, { useEffect, useState } from "react";
import { Card } from "components";
import { Business } from "types";
import "./discover.scss";
import { fetchFeaturedBusinesses } from "graphql/queries";

export default function () {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const featured = await fetchFeaturedBusinesses();
    setBusinesses(featured);
  }

  function renderBusinesses() {
    return businesses.map((business, i) => (
      <li className="discover__business-list__item">
        <Card key={i} {...{ business }} />
      </li>
    ));
  }

  return (
    <div className="discover">
      <ul className="discover__business-list">{renderBusinesses()}</ul>
    </div>
  );
}
