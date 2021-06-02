import React, {useContext} from 'react'
import {CreateContext} from "../../../context/CreateContext";

export const TextInput = ({props: {lessonIndex, index}}) => {
  const {form, setForm} = useContext(CreateContext)
  const changeHandler = ev => {
    setForm(prev => {
      prev.lessons[lessonIndex].text[index] = ev.target.value
      return prev
    })
  }

  return (
    <label className='auth-form__label'>
      Text
      <input
        type="text"
        name="text"
        onChange={changeHandler}
        value={form.lessons[lessonIndex].text[index]}
      />
    </label>
  )
}

