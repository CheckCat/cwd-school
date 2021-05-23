import {useState, useCallback, useEffect} from 'react'
import {useHttp} from "./http.hook";

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const [name, setName] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const {request} = useHttp()

  const login = useCallback((jwtToken, id, role) => {
    setToken(jwtToken)
    setUserId(id)
    setRole(role)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setRole(null)
    localStorage.removeItem(storageName)
  }, [])

  const tryAuth = useCallback(async token => {
    try {
      const res = await request('http://localhost:5001/api/auth/verify', 'POST', null,
        {Authorization: `Bearer ${token}`})
      console.log('Ты вошел')
      login(res.token, res.userId, res.role)
      setName(res.blockchainAccount)
      setReady(true)
    } catch (e) {
      setReady(true)
      console.log('Ты не вошел')
      console.log(e)
    }
  }, [login, request])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data?.token) {
      tryAuth(data.token)
      return
    }
    setReady(true)
  }, [tryAuth])

  return {login, logout, token, role, name, setName, userId, ready}
}