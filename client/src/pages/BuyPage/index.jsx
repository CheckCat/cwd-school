import React from 'react';
import CourseInfo from "../../containers/CourseInfo";
import getRandomKey from "../../utils/getRandomKey";
import './index.css'
import Footer from "../../containers/Footer";
import {connect} from "react-redux";

const BuyPage = ({coursesInfo, isAuthenticated}) => {
	return (
		<div className="container">
			<div className='buy-course'>
				<div className="buy-course__title-wrapper">
					<h1 className='buy-course__title'>Доступные курсы</h1>
				</div>
				<ul className='courses-info buy-course__courses-info'>
					{coursesInfo.map(c => <CourseInfo key={getRandomKey()} isOpen={isAuthenticated}
																						isAuthenticated={isAuthenticated} courseInfo={c}/>)}
				</ul>
				<Footer/>
			</div>
		</div>
	);
}

const mapStateToProps = ({commonCoursesData: {coursesInfo}}) => ({coursesInfo})

export default connect(mapStateToProps)(BuyPage);
