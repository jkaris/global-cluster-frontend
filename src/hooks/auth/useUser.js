import { useDispatch, useSelector } from "react-redux";

/**
 * Retrieves user information from the Redux store using the useSelector hook.
 * @returns {Object} An object containing user information such as isAuthenticated, userRole, and user.
 */
export const useUser = () => {
  // const loggedUser = useSelector(selectUser);
  // const global = useSelector(selectGlobal)

  // const { user, userRole , isAuthenticated } = loggedUser ;

  const isAuthenticated = true;
  const userRole = "admin";
  const user = {};

  return { isAuthenticated, userRole, user };
  
};
