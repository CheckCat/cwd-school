import React, {useCallback, useEffect, useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import AdminRoutes from "./routes/AdminRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import DefaultRoutes from "./routes/DefaultRoutes";
import {connect} from "react-redux";
import {tryAuth} from "./redux/actions/auth.actions";
import Navbar from "./containers/Navbar";
import Loader from "./components/Loader";
import useHttp from "./hooks/http.hook";
import config from './config.js'
import {setCoursesInfo, setDurationInfo} from "./redux/actions/course.actions";
import BuyModal from "./containers/BuyModal";
import ModalWindow from "./components/ModalWindow";
import ThanksModal from "./containers/ThanksModal";

const {storageName} = config


const App = ({authData, addition: {isReady, message, thanksModalIsOpen}, coursesData, tryAuth, setCoursesInfo, setDurationInfo, isOpen}) => {
	const request = useHttp()
	const [routes, setRoutes] = useState(<DefaultRoutes />)
	const tryAuthCallback = useCallback(tryAuth, [tryAuth])

	const getRoutes = () => {
		if(authData.role === 'admin') return <AdminRoutes courses={coursesData} token={authData.token} theme={authData.theme}/>
		if(authData.role === 'student') return <StudentRoutes courses={coursesData}/>
		return <DefaultRoutes />
	}

	useEffect(() => {
		const antipodes = {
			dark: 'light',
			light: 'dark'
		}
		document.querySelector('html').classList.remove(`${antipodes[authData.theme]}-theme`)
		document.querySelector('html').classList.add(`${authData.theme}-theme`)
	}, [authData.theme])

	useEffect(() => {
		const getCourseInfo = async () => {
			try {
				const {courses} = await request(`${config.baseUrl}/api/course`)

				setCoursesInfo(courses.map(({title, subscriptionDescription}) => ({title, subscriptionDescription})))
				setDurationInfo(courses.map(({title, subscriptionPrices}) => ({title, subscriptionPrices})))
			} catch (e) {

			}
		}
		getCourseInfo()
	}, [request, setCoursesInfo, setDurationInfo])

	useEffect(() => {
		setRoutes(getRoutes())
	}, [authData.role, coursesData, authData.token, authData.theme, setRoutes])

	useEffect(() => {
		try {
			const {token} = JSON.parse(localStorage.getItem(storageName)) || {}
			tryAuthCallback(token, request)
		} catch (e) {

		}
	}, [tryAuthCallback, request])

	if (!isReady) {
		return (
			<div className={authData.theme ? `${authData.theme}-theme` : 'dark-theme'}>
				<Loader/>
			</div>
		)
	}

	return (
		<Router>
			<Navbar/>
			{routes}
			{isOpen && <BuyModal/>}
			{thanksModalIsOpen && <ThanksModal token={authData.token}/>}
			{message.message && <ModalWindow message={message}/>}
		</Router>
	);
}

const mapStateToProps = ({authData, addition, coursesData, commonCoursesData: {isOpen}}) => ({
	authData,
	addition,
	coursesData,
	isOpen
})

const mapDispatchToProps = {
	tryAuth,
	setCoursesInfo,
	setDurationInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
