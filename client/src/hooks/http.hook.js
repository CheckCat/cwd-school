import {useCallback} from 'react'
import {useDispatch} from "react-redux";
import {loading} from "../redux/actions/service.actions";

const useHttp = () => {
	const dispatch = useDispatch()
	
	const request = useCallback(async (url, method = 'GET', body = null, headers = {}, type) => {
		dispatch(loading())
		try {
			if (body && type !== 'SENDFILES') {
				body = JSON.stringify(body)
				headers['Content-Type'] = 'application/json'
			}
			const response = await fetch(url, {method, body, headers})
			let data
			switch (type){
				case 'GETFILES':
					data = await response.blob()
					break
				default:
					data = await response.json()
			}
			
			if (!response.ok) {
				throw new Error(data.message || 'Что-то пошло не так')
			}
			
			dispatch(loading())
			
			return data
		} catch (e) {
			dispatch(loading())
			throw e
		}
	}, [dispatch])
	
	return request
}


export default useHttp