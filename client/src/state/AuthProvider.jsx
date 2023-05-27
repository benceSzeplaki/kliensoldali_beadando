import {createContext, useContext} from "react";
import useUserDetails from "../hooks/useUserDetails.js";

function useAuthService() {
    const [token, setToken] = useUserDetails("accessToken", null);
    const [userID, setUserID] = useUserDetails("id", null);

    const logout = () => {
        setToken(null);
        setUserID(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("id");
    };

    const login = (data) => {
        console.log("Logging in client...");
        if (data.accessToken) {
            console.log("Saving user information in local storage...");
            localStorage.setItem("id", JSON.stringify(data.user.id));
            localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        }
        return data;
    }

    return {token, userID, logout, login};
}

const AuthContext = createContext();

function AuthProvider({ children }) {
    const context = useAuthService();
    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("No auth context");
    }
    return context;
}