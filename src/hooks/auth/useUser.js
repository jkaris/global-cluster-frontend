import { useDispatch, useSelector } from "react-redux";

export const useUser = () => {

    // const loggedUser = useSelector(selectUser);
    // const global = useSelector(selectGlobal)

    // const { user, userRole , isAuthenticated } = loggedUser ;

    const isAuthenticated = true;
    const userRole = 'admin';
    const user = {}

    return { isAuthenticated, userRole, user }
}






