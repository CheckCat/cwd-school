import React from 'react';
import './index.css'
import {connect} from "react-redux";

const Footer = ({theme}) => {
	return (
		<footer className='footer'>
			<div className="footer__text-wrapper">
				<p className='footer__title'>CrowdSkills</p>
				<p className='footer__description'>blockchain</p>
			</div>
			<div className="footer__image-wrapper">
				<a className='footer__image' href='https://t.me/CrowdSkills' rel='noreferrer' target='_blank'><img src={`${theme}-images/inst.png`} alt="instagram"/></a>
				<a className='footer__image' href='https://www.instagram.com/_crowdskills_' rel='noreferrer' target='_blank'><img src={`${theme}-images/telegram.png`} alt="telegram"/></a>
			</div>
		</footer>
	);
}

const mapStateToProps = ({authData: {theme}}) => ({theme})

export default connect(mapStateToProps)(Footer);