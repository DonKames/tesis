import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from '../../HomeScreen';
import { PublicRoutes } from './PublicRoutes';
//import { Layout } from '../ui/Layout';
//import { PrivateRoutes } from './PrivateRoutes';
//import { PublicRoutes } from './PublicRoutes';
//import { useState } from 'react';
//import HomeScreen from '../../HomeScreen';



export default function AppRouter() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
        <Routes>
            {/* <Route path="/" element={<Layout />}> */}
                <Route index element={<HomeScreen />} />
                <Route path="pbl/*" element={<PublicRoutes isLoggedIn={isLoggedIn} />} />
                {/* <Route path="pvt/*" element={<PrivateRoutes isLoggedIn={isLoggedIn} />} /> */}
                {/*<Route path='*' element={<Navigate to='/' />} />*/}
            {/* </Route> */}
        </Routes>
    </>
  )
}
