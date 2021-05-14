export type MenuItem = {
  title: string;
  items: string[];
};

export type Business = {
  id: string;
  title: string;
  description: string;
  avatar: string;
  region: "nj";
  slug: string;
  menu: MenuItem[];
  email: string;
  deliveryLocations: string[];
};
