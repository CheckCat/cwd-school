import React, {useRef} from 'react'
import {connect} from "react-redux";
import AdminNav from "./AdminNav";
import StudentNav from "./StudentNav";
import DefaultNav from "./DefaultNav";
import './index.css'

export const Navbar = ({authData: {role, theme}}) => {
	const nav = useRef()
	
	const clickHandler = ({target}) => {
		target.offsetParent.classList.toggle('nav__burger_opened')
		nav.current.classList.toggle('nav_closed')
	}
	
	switch (role) {
		case 'admin':
			return <AdminNav theme={theme}/>
		case 'student':
			return (
				<nav ref={nav} className='nav nav_closed'>
					<div className='nav__burger' onClick={clickHandler}>
						<span className='nav__burger-elem'></span>
					</div>
					<ul className='nav__list'>
						<StudentNav/>
					</ul>
				</nav>
			)
		default:
			return <DefaultNav theme={theme}/>
	}
}

const mapStateToProps = ({authData}) => ({
	authData
})

export default connect(mapStateToProps)(Navbar)