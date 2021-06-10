import React, {useCallback, useEffect, useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import chooseRoutes from "./routes"
import {connect} from "react-redux";
import {tryAuth} from "./redux/actions/auth.actions";
import Navbar from "./containers/Navbar/index";
import {Loader} from "./components/Loader/index";
import useHttp from "./hooks/http.hook";
import config from './config.js'

const {storageName} = config


function App({authData, addition: {isReady}, coursesData, tryAuth}) {
  const request = useHttp()
  const [routes, setRoutes] = useState(<></>)
  const tryAuthCallback = useCallback(tryAuth, [tryAuth])
  useEffect(() => {
    console.log(coursesData)
    setRoutes(chooseRoutes(authData.role, coursesData))
  }, [authData.role, coursesData])
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)) || {}
    tryAuthCallback(data.token, request)
  }, [tryAuthCallback, request])

  if (!isReady) {
    return <Loader/>
  }
  
  return (
      <Router>
        <Navbar/>
        <div className="container">
          {routes}
        </div>
      </Router>
  );
}

const mapStateToProps = ({authData, addition, coursesData}) => ({
  authData,
  addition,
  coursesData
})

const mapDispatchToProps = {
  tryAuth
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
