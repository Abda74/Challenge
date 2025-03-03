import React from "react";
import {BrowserRouter, } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <MyRoutes />
            </BrowserRouter>
        </div>
    );
};

export default App;
