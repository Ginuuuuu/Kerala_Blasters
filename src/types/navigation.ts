export interface NavRoute {
  id: string;
  label: string;
  path: string;
  eyebrow?: string;
  badge?: string;
}

export interface NavigationContent {
  brand: {
    name: string;
    subtext: string;
    founded: number;
    homeCity: string;
  };
  routes: NavRoute[];
  socials: {
    platform: string;
    label: string;
    url: string;
  }[];
  legalNotice: string;
}
