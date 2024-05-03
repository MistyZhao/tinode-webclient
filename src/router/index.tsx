import { lazy, Suspense } from "react";

// import Layout from "@/views/layout"
// lazy 懒加载方法 需要配合Suspense方法包在组件外(加载指示器 => 等待时期react该展示的内容)
const Layout = lazy(() => import("@/views/layout"))

// import Login from "@/views/Login"
import NoFound from "@/views/404"
// import AuthorVerify from "@/components/AuthRouter";
import HomePage from "@/views/HomePage"
import Part1 from "@/views/Part1"
import Part2 from "@/views/Part2"
import Part3 from "@/views/Part3"


import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";

// 身份校验
const AuthorVerify = ({ children }: { children: JSX.Element }) => {
    const { pathname } = useLocation();
    const { token } = useSelector((state: any) => state.user)

    if (token) {
        return pathname === '/login' ? <Navigate to="/" replace></Navigate> : children
    } else {
        // return pathname === '/login' ? <>{children}</> : <Navigate to="/login" replace></Navigate>;
        return null
    }
}

const routes = [
    // {
    //     path: "/login",
    //     element: <AuthorVerify><Login /></AuthorVerify>
    // },
    {
        path: "/",
        element: 
        // <AuthorVerify>
            <Suspense fallback={<div> loding....</div >}>
                <Layout />
            </Suspense >,
        // </AuthorVerify>,
        children: [
            
            {//首页
                path: "/home",
                element: <HomePage />,
            },
            {
                path: '/part1',
                element: <Part1 />,
            },
            {
                path: '/part2',
                element: <Part2 />,
            },
            {
                path: '/part3',
                element: <Part3 />,
            },
            
        ]
    },
    {
        path: '*',
        auth: false,
        layout: false,
        element: <NoFound />
    },
]

export default routes