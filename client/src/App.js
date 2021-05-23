import React, {useCallback, useEffect, useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {chooseRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar/Navbar";
import {Loader} from "./components/Loader";
import {useHttp} from "./hooks/http.hook";


function App() {
  const {token, role, login, name, logout, userId, ready, setName} = useAuth()
  const [routes, setRoutes] = useState(<></>)

  useEffect(() => {
    setRoutes(chooseRoutes(role))
  }, [role])

  if (!ready) {
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, role, name, setName
    }}>
      <Router>
        <Navbar/>
        <div className="container">
          {routes}
        </div>
      </Router>

    </AuthContext.Provider>
  );
}

export default App;
