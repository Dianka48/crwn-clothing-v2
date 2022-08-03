import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "../../contexts/user.context";

export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};
