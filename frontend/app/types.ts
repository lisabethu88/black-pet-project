export type StoryType = {
  id: string;
  petName: string;
  speciesBreed: string;
  title: string;
  body: string;
  imageUrl: string;
  author: string;
  submittedAt: string;
  status: "pending" | "approved";
  featured?: boolean;
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
