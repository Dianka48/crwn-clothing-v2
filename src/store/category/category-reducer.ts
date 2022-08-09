import { AnyAction } from "redux";
import { setCategories } from "./category.action";
import { Category } from "./category.types";

export type CategoriesState = {
  readonly categories: Category[];
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction
) => {
  if (setCategories.match(action)) {
    return { ...state, categories: action.payload };
  }
  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
  //     return { ...state, categories: action.payload };
  //   default:
  //     return state;
  // }
  return state;
};
