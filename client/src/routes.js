import React from "react"
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthPage from "./pages/Authentication/AuthPage";
import RegPage from "./pages/Authentication/RegPage";
import CreatePage from "./pages/CreatePage";
import BlockPage from "./pages/BlockPage";
import getRandomKey from "./utils/getRandomKey";
import LessonPage from "./pages/LessonPage";

const chooseRoutes = (role, courses = []) => {
	switch (role) {
		case 'admin':
			return (
				<Switch>
					<Route path={"/"} exact>
						<h1>Landing</h1>
					</Route>
					<Route path={"/buy"}>
						<h1>Buying the subscriptions</h1>
					</Route>
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/courses/${keyword}/:blockKey`} exact>
							<BlockPage courseKey={keyword} />
						</Route>
					))}
					{courses.map(({keyword}) => (
						<Route key={getRandomKey()} path={`/courses/${keyword}/:blockKey/:lessonKey`}>
							<LessonPage courseKey={keyword} />
						</Route>
					))}
					<Route path={"/create"}>
						<CreatePage/>
					</Route>
					<Route path={"/admin"} exact>
						<h1>Admin panel Users</h1>
					</Route>
					<Route path={"/admin/courses"}>
						<h1>Admin panel Courses</h1>
					</Route>
					<Redirect to={"/"}/>
				</Switch>
			)
		case 'student':
			return (
				<Switch>
					<Route path={"/"} exact>
						<h1>Landing</h1>
					</Route>
					<Route path={"/buy"}>
						<h1>Buying the subscriptions</h1>
					</Route>
					<Route path={"/courses/:keyword"} exact>
						<h1>Course</h1>
					</Route>
					<Route path={"/courses/:keyword/:id"}>
						<h1>One lesson</h1>
					</Route>
					<Redirect to={"/"}/>
				</Switch>
			)
		default:
			return (
				<Switch>
					<Route path={"/"} exact>
						<h1>Landing</h1>
					</Route>
					<Route path={"/auth"}>
						<>
							<AuthPage/>
						</>
					</Route>
					<Route path={"/reg"}>
						<>
							<RegPage/>
						</>
					</Route>
					<Redirect to={"/"}/>
				</Switch>
			)
	}
}

export default chooseRoutes