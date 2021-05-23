import React from 'react'

export const TextInput = ({props: {index, form, setForm}}) => {
  const changeHandler = ev => {
    setForm(prev => {
      prev.text[index] = ev.target.value
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
        value={form.text[index]}
      />
    </label>
  )
}

