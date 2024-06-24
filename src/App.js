import React, { lazy, Suspense } from "react";
import ReactDOM from 'react-dom/client';
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import Error  from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Contact from "./components/Contact";
// import Grocery from "./components/Grocery";


// bundling
// Chunking
// Code Splitting
// Dynamic bundling
// lazy loading
// on demand loading

const Grocery = lazy( () => import("./components/Grocery"))
const About = lazy( () => import("./components/About"))

const Applayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: '/about',
                element: <Suspense fallback={<h1>Loading about ...</h1>}> <About /> </Suspense>
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/restaurants/:resId',
                element: <RestaurantMenu />
            },
            {
                path: '/grocery',
                element: <Suspense fallback={<h1>Loading grocery ...</h1>}> <Grocery /> </Suspense>
            }
        ],
        errorElement: <Error />
    },
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)