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

const LandingPage = ({isAuthenticated, coursesInfo, theme}) => {
	return (
		<>
			<div className="header">
				<img className='header__img' src={`${theme}-images/logo-main.png`} alt="logo"/>
			</div>
			<Hello theme={theme} isAuthenticated={isAuthenticated}/>
			<section className='courses-preview'>
				<ul className='courses-info'>
					{coursesInfo.map(c => <CourseInfo key={getRandomKey()} isOpen={isAuthenticated}
																						isAuthenticated={isAuthenticated} courseInfo={c}/>)}
				</ul>
			</section>
			<WhatIs />
			<Advantages theme={theme}/>
			<Ask isAuthenticated={isAuthenticated}/>
			<Footer/>
		</>
	);
}

const mapStateToProps = ({commonCoursesData: {coursesInfo}, authData: {theme}}) => ({coursesInfo, theme})

export default connect(mapStateToProps)(LandingPage);