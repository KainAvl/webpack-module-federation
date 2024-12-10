import { useState } from "react";
import * as classes from "./App.module.scss";
import { shopRoutes } from "@packages/shared/src/routes/shop";
import { Link } from "react-router-dom";

const Shop = () => {
        const [counter, setCounter] = useState(0);
    return (
        <>
            <h1>
                SHOP
            </h1>
            <Link to={shopRoutes.second}>Go to second</Link>
            <br />
            <button onClick={() => {setCounter(counter + 1)}}>shop clicks: {counter}</button>
        </>
    );
};

export default Shop;