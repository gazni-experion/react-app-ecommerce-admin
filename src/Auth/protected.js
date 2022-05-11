import { Navigate } from "react-router-dom";
import { GetAdminDetails } from '../Store/Actions/authAction'
import store from "../Store/store";


const Protected = ({ children }) => {
    GetAdminDetails();
    let loginStatus = store.getState().auth.isLoggedIn;
 if (!loginStatus) {
 return <Navigate to="/" replace />;
 }
 return children;
};
export default Protected;