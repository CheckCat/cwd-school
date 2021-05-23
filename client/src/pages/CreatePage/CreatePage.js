import React, {useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import config from '../../config.json'
import {Lesson} from '../../components/Create/Lesson/Lesson'
import {getRandomKey} from '../../utils/getRandomKey'

export const CreatePage = () => {
  const [form, setForm] = useState(JSON.parse(JSON.stringify(config.createStateTemplate)))
  const [lessons, setLessons] = useState([])
  const {loading, request} = useHttp()

  useEffect(() => {
    setLessons(prev => [...prev, <Lesson key={getRandomKey()}/>])
  }, [])

  const createHandler = async (ev) => {
    ev.preventDefault()
    try {
      const formData = new FormData(ev.target)
      console.log(ev.target.elements)
      const data = await request('http://localhost:5001/api/course/a', 'POST', formData, {}, true)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  const changeHandler = ev => {
    setForm({...form, [ev.target.name]: ev.target.value})
  }

  const createLesson = () => {
    setLessons(prev => [...prev, <Lesson key={getRandomKey()}/>])
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
            <button type='button' onClick={createLesson}>+ lesson</button>
            {lessons}
            <button className='auth-form__button' type="submit">Создать</button>
          </>
      }
    </form>
  );
}


