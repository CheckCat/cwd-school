import React, {useContext, useEffect, useState} from 'react'
import {TextInput} from './TextInput'
import {TimecodeInput} from './TimecodeInput'
import {getRandomKey} from '../../../utils/getRandomKey'
import {CreateContext} from "../../../context/CreateContext";

export const Lesson = ({lessonIndex}) => {
  const {form, setForm} = useContext(CreateContext)
  const [timecodes, setTimecodes] = useState([ <TimecodeInput key={getRandomKey()} props={{lessonIndex, index: 0}}/>])
  const [text, setText] = useState([<TextInput key={getRandomKey()} props={{lessonIndex, index: 0}}/>])

  // useEffect(() => {
  //   setTimecodes(prev => [...prev,])
  //   setText(prev => [...prev, ])
  // }, [])
  useEffect(() => {
    return () => console.log('YMER YROK')
  })

  const changeHandler = ev => {
    setForm(prev => {
      prev.lessons[lessonIndex][ev.target.name] = ev.target.value
      return prev
    })

  }

  const createField = field => {
    switch (field) {
      case 'timecodes':
        setTimecodes(prev => [...prev, <TimecodeInput key={getRandomKey()} props={{lessonIndex, index: prev.length}}/>])
        break
      case 'text':
        setText(prev => [...prev, <TextInput key={getRandomKey()} props={{lessonIndex, index: prev.length}}/>])
        break
      default:
        return
    }
  }
  console.log(form.lessons[lessonIndex])
  return (
    <>
      <label className='auth-form__label'>
        Видео
        <input
          className='auth-form__input'
          type="text"
          name="video"
          value={form.lessons[lessonIndex].video}
          onChange={changeHandler}
        />
      </label>
      <button type='button' onClick={() => createField('timecodes')}>+ timecode</button>
      {timecodes}
      <label className='auth-form__label'>
        PDF
        <input
          type="file"
          name="pdf"
          multiple
        />
      </label>
      <label className='auth-form__label'>
        Audio
        <input
          type="file"
          name="audio"
          multiple
        />
      </label>
      <button type='button' onClick={() => createField('text')}>+ text</button>
      {text}
    </>
  );
}