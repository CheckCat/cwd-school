import React from 'react';
import {NavLink} from "react-router-dom";
import config from "../../config";

const LandingNav = ({closeHandler, theme}) => (
	<>
		<li>
			<NavLink onClick={closeHandler} className='nav__elem' to="/" exact>
				<img src={`${config.clientUrl}/${theme}-images/main.png`} className='nav__img' alt="Главная"/>
				Главная
			</NavLink>
		</li>
	</>
)


export default LandingNav;
