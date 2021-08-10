import {Redirect, Route, Switch} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import BuyPage from "../pages/BuyPage";
import getRandomKey from "../utils/getRandomKey";
import BlockPage from "../pages/BlockPage";
import LessonPage from "../pages/LessonPage";
import React from "react";

const StudentRoutes = ({courses}) => (
    <div className='container'>
    <Route>
        <Route path={"/"} exact>
            <LandingPage isAuthenticated={true}/>
        </Route>
        <Route path={"/buy"}>
            <BuyPage isAuthenticated={true}/>
        </Route>
        <Route path={`/courses/:courseKey/:blockKey`} exact>
            <BlockPage/>
        </Route>
        <Route key={getRandomKey()} path={`/courses/:courseKey/:blockKey/:index`} exact>
            <LessonPage/>
        </Route>
        <Redirect to={"/"}/>
    </Route>
    </div>
)

export default StudentRoutes
