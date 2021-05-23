import React from 'react'

export const TimecodeInput = ({props: {index, form, setForm}}) => {
  const changeHandler = ev => {
    setForm(prev => {
      prev.timecodes[index] = ev.target.value
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
        value={form.timecodes[index]}
      />
    </label>
  )
}

