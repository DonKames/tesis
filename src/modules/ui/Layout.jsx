import React from 'react';
import { Outlet } from 'react-router';
import { NavBar } from './NavBar';
import { FooterBar } from './FooterBar';

export const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <FooterBar />
        </>
    );
};
