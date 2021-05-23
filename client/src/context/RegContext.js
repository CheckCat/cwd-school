import {createContext} from "react"

function noop() {
}

export const RegContext = createContext({
  state: null,
  setState: noop,
  form: null,
  setForm: noop,
  changeHandler: noop
})