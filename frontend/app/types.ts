export type StoryType = {
  id: string;
  pet_name: string;
  species: string;
  breed?: string;
  title: string;
  body: string;
  image_url: string;
  author: string;
  submitted_at: string;
  status: "pending" | "approved";
  featured: boolean;
};

export type PetfinderPet = {
  id: number;
  name: string;
  species: string;
  breeds: {
    primary: string | null;
    secondary: string | null;
    mixed: boolean;
    unknown: boolean;
  };
  age: "Baby" | "Young" | "Adult" | "Senior";
  gender: "Male" | "Female" | "Unknown";
  size: "Small" | "Medium" | "Large" | "XLarge";
  coat: string | null;
  colors: {
    primary: string | null;
    secondary: string | null;
    tertiary: string | null;
  };
  description: string | null;
  photos: {
    small: string;
    medium: string;
    large: string;
    full: string;
  }[];
  distance?: number;
  contact: {
    address: {
      city: string;
      state: string;
      postcode: string;
      country: string;
    };
    email: string | null;
    phone: string | null;
  };
  attributes: {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed?: boolean;
    special_needs: boolean;
    shots_current: boolean;
  };
  environment: {
    children?: boolean;
    dogs?: boolean;
    cats?: boolean;
  };
  url: string;
};

export type FormErrors = Record<
  "pet_name" | "species" | "breed" | "title" | "body" | "image_url" | "author",
  boolean
>;

export type PetFilters = {
  type: string; // dog, cat, etc.
  gender: string; // male, female
  size: string; // small, medium, large, xlarge
  age: string; // baby, young, adult, senior
  sort: string;
  zip: string;
};
