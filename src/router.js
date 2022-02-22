import React from "react";

import { App } from "./app";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageInicio } from "./pages/pageInicio";
import PageTablero from "./pages/pageTablero";

export const Router = () => {
    return (
        <App>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PageInicio />} />

                    <Route path="/tablero" element={<PageTablero />} />
                </Routes>
            </BrowserRouter>
        </App>
    );
};
