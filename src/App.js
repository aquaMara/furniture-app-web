import { Login } from './components/login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigator } from './components/navigation/Navigator';
import { Devices } from './components/devices/Devices';
import { CreateJson } from './components/create-json/CreateJson';
import { AppUpload } from './components/upload/AppUpload';
import { MaterialJson } from './components/material-json/MaterialJson';
import { MenuListJson } from './components/menu-list-json/MenuListJson';
import { BundleJson } from './components/bundle-json/BundleJson';
import { Layout } from './components/navigation/Layout';
import { RequireAuth } from './components/navigation/RequireAuth';

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>} />

      <Route element={<RequireAuth />}>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Devices/>} />
          <Route path='/material-json' element={<MaterialJson/>} />
          <Route path='/menu-json' element={<MenuListJson/>} />
          <Route path='/bundle-json' element={<BundleJson/>} />
          <Route path='/add-json' element={<CreateJson/>} />
          <Route path='/upload-app' element={<AppUpload/>} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;

/*
<div>
    {auth != null ? (
      <>
      <Navigator/>
      <Routes>
        <Route path='/' element={<Devices/>} />
        <Route path='/material-json' element={<MaterialJson/>} />
        <Route path='/menu-json' element={<MenuListJson/>} />
        <Route path='/bundle-json' element={<BundleJson/>} />
        <Route path='/add-json' element={<CreateJson/>} />
        <Route path='/upload-app' element={<AppUpload/>} />
      </Routes>
      </>
    ): (
      <Routes>
        <Route path='/' element={<Login/>} />
      </Routes>
    )}
    </div>
*/
