import React, {useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import config from '../../config.json'
import {Lesson} from '../../components/Create/Lesson/Lesson'
import {getRandomKey} from '../../utils/getRandomKey'
import {CreateContext} from '../../context/CreateContext'
import {Subscription} from '../../components/Create/Subscription/Subscription'
import {logDOM} from "@testing-library/react";

export const CreatePage = () => {
  const [form, setForm] = useState(JSON.parse(JSON.stringify(config.createStateTemplate)))
  const [lessons, setLessons] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const {loading, request} = useHttp()
  console.log('123')
  useEffect(() => {
    setLessons(prev => [...prev, <Lesson key={getRandomKey()} lessonIndex={0}/>])
    setSubscriptions(prev => [...prev, <Subscription key={getRandomKey()} subscriptionIndex={0}/>])
  }, [])

  const createHandler = async (ev) => {
    ev.preventDefault()
    try {
      const formData = new FormData(ev.target)
      formData.append('data', JSON.stringify(form))
      const data = await request('http://localhost:5001/api/course/a', 'POST', formData, {}, true)
      setForm(JSON.parse(JSON.stringify(config.createStateTemplate)))
      setLessons([<Lesson key={getRandomKey()} lessonIndex={0}/>])
      setSubscriptions([<Subscription key={getRandomKey()} subscriptionIndex={0}/>])
      console.log('CreatePageHandler', data)
    } catch (e) {
      console.log(e)
    }
  }

  const changeHandler = ev => {
    setForm({...form, [ev.target.name]: ev.target.value})
  }

  const createLesson = () => {
    setForm(prev => {
      prev.lessons.push(JSON.parse(JSON.stringify(config.lessonStateTemplate)))
      return prev
    })
    setLessons(prev => [...prev, <Lesson key={getRandomKey()} lessonIndex={prev.length}/>])
  }

  const createSubscription = () => {
    setForm(prev => {
      prev.subscriptions.push(JSON.parse(JSON.stringify(config.subscriptionStateTemplate)))
      return prev
    })
    setSubscriptions(prev => [...prev, <Subscription key={getRandomKey()} subscriptionIndex={prev.length}/>])
  }

  return (
    <form className='auth-form' onSubmit={createHandler}>
      <h1 className='auth-form__title'>Создание курса</h1>
      {
        loading
          ?
          <h2>Мяу</h2>
          :
          <>
            <CreateContext.Provider value={{form, setForm}}>
              <label className='auth-form__label'>
                Ключевое слово
                <input
                  className='auth-form__input'
                  type="text"
                  name="keyword"
                  value={form.keyword}
                  onChange={changeHandler}
                  required/>
              </label>
              <label className='auth-form__label'>
                Заголовок
                <input
                  className='auth-form__input'
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={changeHandler}
                  required/>
              </label>
              <button type='button' onClick={createSubscription}>+ subscription</button>
              {subscriptions}
              <button type='button' onClick={createLesson}>+ lesson</button>
              {lessons}
              <button className='auth-form__button' type="submit">Создать</button>
            </CreateContext.Provider>
          </>
      }
    </form>
  );
}


