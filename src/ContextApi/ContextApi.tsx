import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ContextApiType {
    token: string | null;
    setToken: (token: string | null) => void;
}

const ContextApi = createContext<ContextApiType>({
    token: null,
    setToken: () => { },
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const getStoredToken = () => {
        const storedToken = localStorage.getItem("JWT_TOKEN");
        return storedToken ? JSON.parse(storedToken) : null;
    };

    const [token, setToken] = useState<string | null>(getStoredToken());

    const handleSetToken = (newToken: string | null) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("JWT_TOKEN", JSON.stringify(newToken));
        } else {
            localStorage.removeItem("JWT_TOKEN");
        }
    };


    const sendData = {
        token,
        setToken: handleSetToken,
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
};


export const useStoreContext = () => {
    const context = useContext(ContextApi);
    if (context === undefined) {
        throw new Error("useStoreContext must be used within a ContextProvider");
    }
    return context;
}