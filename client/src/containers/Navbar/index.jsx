import React, {useRef} from 'react'
import {connect} from "react-redux";
import AdminNav from "./AdminNav";
import StudentNav from "./StudentNav";
import DefaultNav from "./DefaultNav";
import './index.css'

export const Navbar = ({authData: {role, theme}}) => {
	const nav = useRef()

	const clickHandler = ({target}) => {
		window.scrollTo(0,0)
		target.disabled = true
		if(target.offsetParent.classList.contains('nav__burger_opened')) {
			setTimeout(() => {
				target.offsetParent.nextSibling.classList.add('nav__list_closed')
				target.disabled = false
			}, 300)
		} else {
			target.offsetParent.nextSibling.classList.remove('nav__list_closed')
			setTimeout(() => {
				target.disabled = false
			}, 300)
		}
		target.offsetParent.classList.toggle('nav__burger_opened')
		nav.current.classList.toggle('nav_closed')
	}

	const closeHandler = ({target}) => {
		window.scrollTo(0,0)
		if(target.classList.contains('active') || window.innerWidth > 1550) return
		clickHandler({
			target: document.querySelector('.nav__burger-btn')
		})
	}

	switch (role) {
		case 'admin':
			return <AdminNav theme={theme}/>
		case 'student':
			return (
				<nav ref={nav} className='nav'>
					<div className='nav__burger nav__burger_opened' onClick={clickHandler}>
						<span className='nav__burger-btn'></span>
						<span className='nav__burger-elem nav__burger-elem_top'></span>
						<span className='nav__burger-elem nav__burger-elem_middle'></span>
						<span className='nav__burger-elem nav__burger-elem_bottom'></span>
					</div>
					<ul className='nav__list'>
						<StudentNav closeHandler={closeHandler}/>
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
