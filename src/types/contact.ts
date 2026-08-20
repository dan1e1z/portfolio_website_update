export type ContactInfo = {
  label: string;
  text: string;
  type: "email" | "phone";
};

export type SocialLink = {
  name: string;
  url: string;
};

export type FormData = {
  name: string;
  company: string;
  message: string;
  email: string;
  privacy: boolean;
};
