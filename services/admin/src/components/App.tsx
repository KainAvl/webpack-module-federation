import { useState } from "react";
import * as classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";

export const App = () => {
    return (
        <div>
            <h1>ADMIN MODULE</h1>
            <Outlet/>
        </div>
    );
};