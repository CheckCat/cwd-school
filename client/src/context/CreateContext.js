import {createContext} from "react"

function noop() {
}

export const CreateContext = createContext({
  form: null,
  setForm: noop
})