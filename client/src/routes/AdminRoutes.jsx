import {Redirect, Route, Switch} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import BuyPage from "../pages/BuyPage";
import getRandomKey from "../utils/getRandomKey";
import BlockPage from "../pages/BlockPage";
import LessonPage from "../pages/LessonPage";
import CreatePage from "../pages/Admin/CreatePage";
import UsersTablePage from "../pages/Admin/UsersTablePage";
import DeleteCoursePage from "../pages/Admin/DeleteCoursePage";
import CreateCoursePage from "../pages/Admin/CreateCoursePage";
import DeleteBlockAndEditCoursePage from "../pages/Admin/DeleteBlockAndEditCoursePage";
import DeleteLessonAndEditBlockPage from "../pages/Admin/DeleteLessonAndEditBlockPage";
import CreateLessonPage from "../pages/Admin/CreateLessonPage";
import CreateBlockPage from "../pages/Admin/CreateBlockPage";
import EditLessonPage from "../pages/Admin/EditLessonPage";
import React from "react";

const AdminRoutes = ({courses, token, theme}) => (
    <>
            <Switch>
                <Route path={"/"} exact>
                    <LandingPage isAuthenticated={true}/>
                </Route>
                <Route path={"/auth"}>
                    <Redirect to={"/"}/>
                </Route>
                <Route path={"/buy"}>
                    <BuyPage isAuthenticated={true}/>
                </Route>
                <Route path={"/create"}>
                    <CreatePage/>
                </Route>
                <Route path={"/admin/courses"} exact>
                    <DeleteCoursePage token={token}/>
                </Route>
                <Route path={"/admin/courses/create_course"}>
                    <CreateCoursePage token={token}/>
                </Route>
                <Route path={`/admin/courses/:courseKey/:blockKey`} exact>
                    <DeleteLessonAndEditBlockPage token={token}/>
                </Route>
                <Route path={`/admin/courses/:courseKey/:blockKey/new/:index`} exact>
                    <CreateLessonPage token={token}/>
                </Route>
                <Route path={`/admin/courses/:courseKey/new/:index`} exact>
                    <CreateBlockPage token={token}/>
                </Route>
                <Route path={`/admin/courses/:courseKey/:blockKey/:index`} exact>
                    <EditLessonPage token={token} theme={theme}/>
                </Route>
                <Route path={`/admin/courses/:courseKey`} exact>
                    <DeleteBlockAndEditCoursePage token={token}/>
                </Route>
                <Route path={`/courses/:courseKey/:blockKey`} exact>
                    <BlockPage/>
                </Route>
                <Route key={getRandomKey()} path={`/courses/:courseKey/:blockKey/:index`} exact>
                    <LessonPage/>
                </Route>
                <Route path={"/admin/students"} exact>
                    <UsersTablePage courses={courses} token={token}/>
                </Route>
                <Redirect to={"/"}/>
            </Switch>
    </>
)

export default AdminRoutes
