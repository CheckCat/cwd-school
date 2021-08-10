import React from 'react';
import './index.css'
import getRandomKey from "../../utils/getRandomKey";
import WhatIs from "../../components/Landing/WhatIs";
import Hello from "../../components/Landing/Hello";
import Advantages from "../../components/Landing/Advantages";
import CourseInfo from "../../containers/CourseInfo";
import Ask from "../../components/Landing/Ask";
import Footer from "../../containers/Footer";
import {connect} from 'react-redux'

const LandingPage = ({isAuthenticated, coursesInfo, theme}) => (
	<div className="container">
		<div className='first-screen'>
			<div className="header">
				<img className='header__img' src={`${theme}-images/logo-main.png`} alt="logo"/>
			</div>
			<Hello theme={theme} isAuthenticated={isAuthenticated}/>
		</div>
		<section className='courses-preview'>
			<ul>
				{coursesInfo.map((c, i) => <CourseInfo key={getRandomKey()} isOpen={isAuthenticated} index={i}
																					isAuthenticated={isAuthenticated} courseInfo={c}/>)}
			</ul>
		</section>
		<WhatIs/>
		<Advantages theme={theme}/>
		<Ask isAuthenticated={isAuthenticated}/>
		<Footer/>
	</div>
)


const mapStateToProps = ({commonCoursesData: {coursesInfo}, authData: {theme}}) => ({coursesInfo, theme})

export default connect(mapStateToProps)(LandingPage);
