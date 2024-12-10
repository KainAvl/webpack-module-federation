import { shopRoutes } from "@packages/shared/src/routes/shop";
import { Link } from "react-router-dom";

const Second = () => {
    return (
        <>
            <h1>
                SECOND
            </h1>
            <Link to={shopRoutes.main}>Go to main</Link>
        </>
    );
};

export default Second;