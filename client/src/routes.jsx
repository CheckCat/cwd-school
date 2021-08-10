import React from "react"
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthPage from "./pages/Authentication/AuthPage";
import RegPage from "./pages/Authentication/RegPage";
import CreatePage from "./pages/Admin/CreatePage";
import BlockPage from "./pages/BlockPage";
import getRandomKey from "./utils/getRandomKey";
import LessonPage from "./pages/LessonPage";
import ForgotPage from "./pages/Authentication/ForgotPage";
import LandingPage from "./pages/LandingPage";
import BuyPage from "./pages/BuyPage";
import DeleteCoursePage from "./pages/Admin/DeleteCoursePage";
import DeleteBlockAndEditCoursePage from "./pages/Admin/DeleteBlockAndEditCoursePage";
import CreateBlockPage from "./pages/Admin/CreateBlockPage";
import DeleteLessonAndEditBlockPage from "./pages/Admin/DeleteLessonAndEditBlockPage";
import CreateLessonPage from "./pages/Admin/CreateLessonPage";
import EditLessonPage from "./pages/ EditLessonPage";
import CreateCoursePage from "./pages/Admin/CreateCoursePage";
import UsersTablePage from "./pages/Admin/UsersTablePage";

const chooseRoutes = (role, courses = [], token, theme) => {
	switch (role) {
		case 'admin':
			return (
				<Switch>
					<Route path={"/"} exact>
						<LandingPage isAuthenticated={true}/>
					</Route>
					<Route path={"/buy"}>
						<BuyPage isAuthenticated={true}/>
					</Route>
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/courses/${keyword}/:blockKey`} exact>
							<BlockPage courseKey={keyword}/>
						</Route>
					))}
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/courses/${keyword}/:blockKey/:lessonKey`} exact>
							<LessonPage courseKey={keyword}/>
						</Route>
					))}
					<Route path={"/create"}>
						<CreatePage/>
					</Route>
					<Route path={"/admin/students"} exact>
						<UsersTablePage courses={courses} token={token}/>
					</Route>
					<Route path={"/admin/courses"} exact>
						<DeleteCoursePage token={token}/>
					</Route>
					<Route path={"/admin/courses/create_course"} exact>
						<CreateCoursePage token={token}/>
					</Route>
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/admin/courses/${keyword}`} exact>
							<DeleteBlockAndEditCoursePage courseKey={keyword} token={token}/>
						</Route>
					))}
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/admin/courses/${keyword}/:blockKey`} exact>
							<DeleteLessonAndEditBlockPage token={token} courseKey={keyword}/>
						</Route>
					))}
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/admin/courses/${keyword}/:blockKey/new/:index`} exact>
							<CreateLessonPage token={token} courseKey={keyword}/>
						</Route>
					))}
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/admin/courses/${keyword}/new/:index`} exact>
							<CreateBlockPage token={token} courseKey={keyword}/>
						</Route>
					))}
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/admin/courses/${keyword}/:blockKey/:index`} exact>
							<EditLessonPage token={token} courseKey={keyword} theme={theme}/>
						</Route>
					))}
					<Redirect to={"/"}/>
				</Switch>
			)
		case 'student':
			return (
				<Route>
					<Route path={"/"} exact>
						<LandingPage isAuthenticated={true}/>
					</Route>
					<Route path={"/buy"}>
						<BuyPage isAuthenticated={true}/>
					</Route>
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/courses/${keyword}/:blockKey`} exact>
							<BlockPage courseKey={keyword}/>
						</Route>
					))}
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/courses/${keyword}/:blockKey/:lessonKey`}>
							<LessonPage courseKey={keyword}/>
						</Route>
					))}
					<Redirect to={"/"}/>
				</Route>
			)
		default:
			return (
				<Switch>
					<Route path={"/"} exact>
						<LandingPage isAuthenticated={false}/>
					</Route>
					<Route path={"/auth"}>
						<AuthPage/>
					</Route>
					<Route path={"/reg"}>
						<RegPage/>
					</Route>
					<Route path={"/forgot"}>
						<ForgotPage/>
					</Route>
					<Redirect to={"/"}/>
				</Switch>
			)
	}
}

export default chooseRoutes
