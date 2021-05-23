import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import './index.css'

export const Navbar = () => {
  const history = useHistory()
  const {logout, role, name} = useContext(AuthContext)
  const logoutHandler = event => {
    event.preventDefault()
    logout()
    history.push('/')
  }

  const landingNav = (
    <>
      <li><NavLink className='nav__elem' to="/"><img src="images/1.png" className='nav__img' alt="О школе"/>О
        школе</NavLink></li>
      <li><a className='nav__elem' href="/#1"><img src="images/1.png" className='nav__img' alt="Курсы"/>Курсы</a>
      </li>
      <li><a className='nav__elem' href="/#2"><img src="images/1.png" className='nav__img'
                                                   alt="Истории учеников"/>Истории учеников</a></li>
      <li><a className='nav__elem' href="/#3"><img src="images/1.png" className='nav__img' alt="Контакты"/>Контакты</a>
      </li>
    </>
  )

  const studentNav = (
    <>
      <li className='nav__logo'><img src="images/1.png" className='logo-img' alt="logo"/>Crowd School</li>
      <li>
        <ul className='nav__list nav__auth'>
          <li className='nav__elem nav__user'><img src="images/1.png" className='nav__img' alt="Выйти"/>{name}
          </li>
          <li><a className='nav__elem' href="/" onClick={logoutHandler}><img src="images/1.png"
                                                                             className='nav__img' alt="Выйти"/>Выйти</a>
          </li>
        </ul>
      </li>
      {landingNav}
      <li><NavLink className='nav__elem' to="/buy"><img src="images/1.png" className='nav__img'
                                                        alt="Подписки"/>Подписки</NavLink>
      </li>
      <li><NavLink className='nav__elem' to="/courses/1"><img src="images/1.png" className='nav__img'
                                                              alt="Первый"/>Первый курс</NavLink></li>
    </>
  )

  switch (role) {
    case 'admin':
      return (
        <nav className='nav'>
          <ul className='nav__list'>
            {studentNav}
            <li><NavLink className='nav__elem' to="/create"><img src="images/1.png" className='nav__img'
                                                                 alt="Создать"/>Создать курс</NavLink></li>
            <li><NavLink className='nav__elem' to="/admin"><img src="images/1.png" className='nav__img'
                                                                alt="Админ"/>Админ панель</NavLink></li>
            <li><NavLink className='nav__elem' to="/admin/courses"><img src="images/1.png" className='nav__img'
                                                                        alt="Курсы"/>Админ панель курсов</NavLink></li>
          </ul>
        </nav>
      )
    case 'student':
      return (
        <nav className='nav'>
          <ul className='nav__list'>
            {studentNav}
          </ul>
        </nav>
      )
    default:
      return (
        <nav className='nav'>
          <ul className='nav__list'>
            <li className='nav__logo'><img src="images/1.png" className='logo-img' alt="logo"/>Crowd School</li>
            <li>
              <ul className='nav__list nav__auth'>
                <li><NavLink className='nav__elem ' to="/auth"><img src="images/1.png" className='nav__img' alt="Auth"/>Личный
                  кабинет</NavLink></li>
              </ul>
            </li>
            {landingNav}
          </ul>
        </nav>
      )
  }
}