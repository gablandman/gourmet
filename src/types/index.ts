export interface Recipe {
  id: string;
  name: string;
  description: string;
  instructions: string;
  category: string;
  image_url: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  created_by: string;
  published: boolean;
  when_to_eat: string;
  ingredients?: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface User {
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
