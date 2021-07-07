import React from 'react';
import './index.css'
import {connect} from "react-redux";
import {toggleThanksIsOpen} from "../../redux/actions/service.actions";
import config from "../../config";
import useHttp from "../../hooks/http.hook";

const ThanksModal = ({token, toggleThanksIsOpen}) => {

    const request = useHttp()

    const closeThanksModalWindow = async () => {
        toggleThanksIsOpen(false)
        await request(`${config.baseUrl}/api/auth/thanks`, 'POST', null,
            {Authorization: `Bearer ${token}`})
    }

    return (
        <div className='disabled'>
            <div className='container thanks-modal'>
                <h2 className='thanks-modal__title'>Подписка успешно оформлена!</h2>
                <p className='thanks-modal__text_desire'>Удачи в изучении!</p>
                <p className='thanks-modal__text_call'>Добавляйтесь в наш специальный чат для учеников</p>
                <a className='thanks-modal__continue-btn' href='/' target='_blank'>Присоединиться</a>
                <p className='thanks-modal__text_purport'>В чате мы будем:</p>
                <ul className='thanks-modal__list'>
                    <li className='thanks-modal__elem'>- проводить открытые уроки</li>
                    <li className='thanks-modal__elem'>- общаться и отвечать на вопросы</li>
                </ul>
                <button onClick={closeThanksModalWindow} className='thanks-modal__close-btn'></button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    toggleThanksIsOpen
}

export default connect(()=>({}), mapDispatchToProps)(ThanksModal);
