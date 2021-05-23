import React, {useEffect, useState} from 'react'
import {TextInput} from './TextInput'
import {TimecodeInput} from './TimecodeInput'
import {getRandomKey} from '../../../utils/getRandomKey'
import config from '../../../config.json'

export const Lesson = () => {
  const [form, setForm] = useState(JSON.parse(JSON.stringify(config.lessonStateTemplate)))
  const [timecodes, setTimecodes] = useState([])
  const [text, setText] = useState([])

  useEffect(() => {
    setTimecodes(prev => [...prev, <TimecodeInput key={getRandomKey()} props={{index: 0, form, setForm}}/>])
    setText(prev => [...prev, <TextInput key={getRandomKey()} props={{index: 0, form, setForm}}/>])
  }, [])

  const changeHandler = ev => {
    setForm({...form, [ev.target.name]: ev.target.value})
  }

  const createField = field => {
    switch (field) {
      case 'timecodes':
        setTimecodes(prev => [...prev, <TimecodeInput key={getRandomKey()} props={{index: prev.length, form, setForm}}/>])
        break
      case 'text':
        setText(prev => [...prev, <TextInput key={getRandomKey()} props={{index: prev.length, form, setForm}}/>])
        break
      default:
        return
    }
  }

  return (
    <>
      <label className='auth-form__label'>
        Видео
        <input
          className='auth-form__input'
          type="text"
          name="video"
          value={form.video}
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