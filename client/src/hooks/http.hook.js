import {useCallback} from 'react'
import {useDispatch} from "react-redux";
import {loading, setError, clearError} from "../redux/actions/service.actions";

const useHttp = () => {
	const dispatch = useDispatch()

	const request = useCallback(async (url, method = 'GET', body = null, headers = {}, type, offLoader = false, onMessage = true) => {
		!offLoader && dispatch(loading())
		try {
			if (body && type !== 'SENDFILES') {
				body = JSON.stringify(body)
				headers['Content-Type'] = 'application/json'
			}
			const response = await fetch(url, {method, body, headers})
			let data
			switch (type) {
				case 'GETFILES':
					data = await response.blob()
					break
				case 'GETAUDIOFILES':
					data = await response.arrayBuffer()
					break
				default:
					data = await response.json()
			}

			if (!response.ok) {
				!offLoader && dispatch(loading())
				// Для дебага с бэка
				// if(data.error) console.error(data.error)
				if(onMessage) {
					dispatch(setError(data.message || 'Что-то пошло не так!', true))
					setTimeout(() => dispatch(clearError()), 3000)
				}
				return
			}
			if (data.message) {
				dispatch(setError(data.message, false))
			}
			!offLoader && dispatch(loading())
			setTimeout(() => dispatch(clearError()), 3000)

			return data
		} catch (e) {
			!offLoader && dispatch(loading())
			if(onMessage) {
				dispatch(setError('Что-то пошло не так!', true))
				setTimeout(() => dispatch(clearError()), 3000)
			}
		}
	}, [dispatch])

	return request
}

export default useHttp;
