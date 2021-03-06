import React, {useEffect, useState} from 'react'
import useHttp from "../../hooks/http.hook"
import {NavLink, useHistory, useParams} from 'react-router-dom'
import Loader from "../../components/Loader"
import {connect} from 'react-redux'
import getRandomKey from "../../utils/getRandomKey";
import config from "../../config";
import './index.css'

const BlockPage = ({token, isLoading}) => {
	const request = useHttp()
	const {courseKey, blockKey} = useParams()
	const {location: {pathname}} = useHistory()
	const [blockData, setBlockData] = useState({courseTitle: '', blockTitle: '', lessons: []})
	useEffect(() => {
		let isMounted = true
		const fetchData = async () => {
			try {
				const data = await request(`${config.baseUrl}/api/course/${courseKey}/${blockKey}`, 'GET', null, {Authorization: `Bearer ${token}`})
				if(!data) return
				isMounted && setBlockData(data)
			} catch (e) {
			}
		}
		fetchData()
		return () => {
			isMounted = false
		}
	}, [blockKey, courseKey, request, setBlockData, token])
	return (
		<div className='container'>
			{
				isLoading
					?
					<Loader/>
					:
					<div className='blocks'>
						<div className='blocks__titles'>
							<h1 className='blocks__course-title'>{blockData.courseTitle}</h1>
							<h2 className='blocks__block-title'>{blockData.blockTitle}</h2>
						</div>
						<ul className='blocks-list'>
							{blockData.lessons.map(({title, description, index}) => {
								return (
									<li className='blocks-list__elem' key={getRandomKey()}>
										<NavLink onClick={() => window.scrollTo(0, 0)} className='blocks-list__wrapper'
												 to={`${pathname}/${index}`}>
											<h3 className='blocks-list__title'>{title}</h3>
											<p className='blocks-list__description'>{description}</p>
										</NavLink>
									</li>
								)
							})}
						</ul>
					</div>
			}
		</div>
	)
}


const mapStateToProps = ({authData, addition}) => ({
	token: authData.token,
	isLoading: addition.isLoading
})

export default connect(mapStateToProps)(BlockPage);
