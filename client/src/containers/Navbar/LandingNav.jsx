import React from 'react';
import {NavLink} from "react-router-dom";

const LandingNav = ({theme}) => (
	<>
		<li>
			<NavLink className='nav__elem' to="/" exact>
				<img src={`${theme}-images/main.png`} className='nav__img' alt="Главная"/>
				Главная
			</NavLink>
		</li>
	</>
)


export default LandingNav;