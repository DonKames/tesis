import React from 'react';
import { Outlet } from 'react-router';
// import { NavBar } from './NavBar';
import { FooterBar } from './FooterBar';
import { NavBar } from './NavBar';

export const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet className='content' />
            <FooterBar />
        </>
    );
};
