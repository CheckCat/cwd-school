import React, {useEffect, useState} from 'react'
import useHttp from "../../hooks/http.hook"
import {NavLink, useHistory, useParams} from 'react-router-dom'
import {Loader} from "../../components/Loader"
import {connect} from 'react-redux'
import getRandomKey from "../../utils/getRandomKey";
import config from "../../config";

const BlockPage = ({courseKey, token, isLoading}) => {
	const request = useHttp()
	const {blockKey} = useParams()
	const {location: {pathname}} = useHistory()
	const [blockData, setBlockData] = useState({title: '', lessons: []})
	useEffect(() => {
		let isMounted = true
		const fetchData = async () => {
			try {
				const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}`, 'GET', null, {Authorization: `Bearer ${token}`})
				isMounted && setBlockData(data)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
		return () => {
			isMounted = false
		}
	}, [blockKey, courseKey, request, setBlockData, token])
	return (
		<>
			{
				isLoading
					?
					<Loader/>
					:
					<>
						<h1>{blockData.title}</h1>
						<ul>
							{blockData.lessons.map(({title, description, index}) => {
								return (
									<li key={getRandomKey()}>
										<NavLink to={`${pathname}/${index}`}>
											<h3>{title}</h3>
											<p>{description}</p>
										</NavLink>
									</li>
								)
							})}
						</ul>
					</>
			}
		</>
	)
}



const mapStateToProps = ({authData, addition}) => ({
	token: authData.token,
	isLoading: addition.isLoading
})

export default connect(mapStateToProps)(BlockPage);