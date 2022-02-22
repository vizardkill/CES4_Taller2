import React, { createContext, useState } from "react";
import { useGetBaraja } from "./hooks/useGetBaraja";

export const AppContext = createContext();

export const App = ({ children }) => {
    const { objBaraja } = useGetBaraja();
    const [objJugadore1, setObjJugador1] = useState();
    const [objJugadore2, setObjJugador2] = useState();

    const handlerChangeJugador1 = (key, values) => {
        setObjJugador1((prevState) => ({
            ...prevState,
            [key]: values,
        }));
    };

    const handlerChangeJugador2 = (key, values) => {
        setObjJugador2((prevState) => ({
            ...prevState,
            [key]: values,
        }));
    };

    if (!objBaraja) {
        return <div>cargando...</div>;
    }

    return (
        <AppContext.Provider
            value={{
                objBaraja,
                objJugadore1,
                objJugadore2,
                handlerChangeJugador1,
                handlerChangeJugador2,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
