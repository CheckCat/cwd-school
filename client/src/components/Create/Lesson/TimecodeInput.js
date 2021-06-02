import React, {useContext} from 'react'
import {CreateContext} from "../../../context/CreateContext";

export const TimecodeInput = ({props: {lessonIndex, index}}) => {
  const {form, setForm} = useContext(CreateContext)
  const changeHandler = ev => {
    setForm(prev => {
      prev.lessons[lessonIndex].timecodes[index] = ev.target.value
      return prev
    })
  }

  return (
    <label className='auth-form__label'>
      Timecodes
      <input
        type="text"
        name="timecode"
        onChange={changeHandler}
        value={form.lessons[lessonIndex].timecodes[index]}
      />
    </label>
  )
}

