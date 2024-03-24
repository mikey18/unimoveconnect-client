import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './landing/Login';
import Signup from './landing/Signup';
import Home from './Dashboard/Screens/Home/Home';
import Trips from './Dashboard/Screens/Trips/Trips';
import Support from './Dashboard/Screens/Support';
import Settings from './Dashboard/Screens/Settings';
import Payment from './Dashboard/Screens/Payment';
import { useState } from 'react';
import { useEffect } from "react"
import NotFound from './NotFound';
import Main from './Main';

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(true)
    }
    else {
      setAuth(false)
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            auth ?
              <>
                <Route path={'/home'} element={<Home />} />
                <Route path={'/trips'} element={<Trips />} />
                {JSON.parse(localStorage.getItem('token')).type === 'user' &&
                <Route path={'/payment'} element={<Payment />} />}
                <Route path={'/support'} element={<Support />} />
                <Route path={'/settings'} element={<Settings />} />
                <Route path={'*'} element={<NotFound auth={auth} />} />
              </>
              :
              <>
                <Route path={'/'} element={<Main />} />
                <Route path={'/login'} element={<Login setAuth={setAuth} />} />
                <Route path={'/signup'} element={<Signup setAuth={setAuth}/>} />
                <Route path={'*'} element={<NotFound auth={auth}/>} />
              </>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
