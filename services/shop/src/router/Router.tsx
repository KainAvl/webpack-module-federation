import { App } from "@/components/App";
import { Second, Shop } from "@/pages/Shop";
import { Suspense } from "react";
import {createBrowserRouter } from "react-router-dom";
import { shopRoutes } from  '@packages/shared/src/routes/shop';

const routes = [
    {
        path: "/shop",
        element: <App/>,
        children: [
            {
                path: shopRoutes.main,
                element: <Suspense fallback={'Loading...'}><Shop /></Suspense>
            },
            {
                path: shopRoutes.second,
                element: <Suspense fallback={'Loading...'}><Second /></Suspense>
            },
        ]
    },
]

export const router = createBrowserRouter(routes);

export default routes;