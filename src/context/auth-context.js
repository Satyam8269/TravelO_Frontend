import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducer";

const initialValue = {
    isAuthModalOpen: false,
    isDropDownModalOpen: false,
    username: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
    accessToken: "",
    name: "",
    selectedTab: "login"
};

const AuthContext = createContext(initialValue);

const AuthProvider = ({children}) => {
 
    const [{ isAuthModalOpen, isDropDownModalOpen, username, number, email, password, confirmPassword, accessToken, name,  selectedTab }, authDispatch] = useReducer(authReducer, initialValue);

    return (
        <AuthContext.Provider value={{isAuthModalOpen, isDropDownModalOpen, username, number, email, password, selectedTab, confirmPassword, accessToken, name, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };