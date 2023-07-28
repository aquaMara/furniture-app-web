import { Login } from './components/login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigator } from './components/navigation/Navigator';
import { Devices } from './components/devices/Devices';
import { CreateJson } from './components/json/CreateJson';
import { useState } from 'react';
import { AppUpload } from './components/upload/AppUpload';
import { MaterialJson } from './components/json/MaterialJson';
import { MenuJson } from './components/json/MenuJson';
import { MenuListJson } from './components/menu-list-json/MenuListJson';

function App() {

  const [logged, setLogged] = useState(true);

  return (
    <BrowserRouter>
    {logged ? (
      <>
      <Navigator/>
      <Routes>
        <Route path='/' element={<Devices/>} />
        <Route path='/material-json' element={<MaterialJson/>} />
        <Route path='/menu-json' element={<MenuJson/>} />
        <Route path='/add-json' element={<CreateJson/>} />
        <Route path='/comment-app' element={<MenuListJson/>} />
        <Route path='/upload-app' element={<AppUpload/>} />
      </Routes>
      </>
    ): (
      <Routes>
        <Route path='/' element={<Login/>} />
      </Routes>
    )}
    </BrowserRouter>
  );
}

export default App;
