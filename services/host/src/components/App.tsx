import { useState } from "react";
import * as classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import { adminRoutes } from '@packages/shared/src/routes/admin';
import {shopRoutes} from '@packages/shared/src/routes/shop';

export const App = () => {
    const [counter, setCounter] = useState<number>(0);
    return (
        <div>
            <h1>PAGE</h1>
            <button onClick={() => {setCounter(counter + 1)}} className={classes.button}>Clicked: {counter}</button>
            <br />
            <Link to={adminRoutes.about}>ABOUT</Link>
            <br />
            <Link to={shopRoutes.main}>SHOP</Link>
            <Outlet/>
        </div>
    );
};