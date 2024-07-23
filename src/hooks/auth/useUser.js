import {  useSelector } from "react-redux";
import { selectGlobal, selectIsAuthenticated, selectUser } from "../../features/auth/authSlice";

/**
 * Retrieves user information from the Redux store using the useSelector hook.
 * @returns {Object} An object containing user information such as isAuthenticated, userRole, and user.
 */
export const useUser = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const global = useSelector(selectGlobal);
  return { isAuthenticated, user,global };
};
