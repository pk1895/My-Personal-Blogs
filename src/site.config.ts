export type SiteConfig = {
  name: string;
  title: string;
  tagline: string;
  avatarUrl: string;
  social: {
    linkedin: string;
    github?: string;
    email?: string;
  };
};

export const site: SiteConfig = {
  name: "Prasad Khanapure",
  title: "Developer & Blogger",
  tagline: "Front End React Developer",
  avatarUrl: "",
  social: {
    linkedin: "https://www.linkedin.com/in/prasad-khanapure/",
    github: "",
    email: ""
  }
};
