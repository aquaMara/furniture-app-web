import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigator } from './Navigator';

export const Layout = () => {
  return (
    <>
        <Navigator />
        <Outlet />
    </>
  )
}
