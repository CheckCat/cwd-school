import React, {useEffect, useRef, useState} from 'react'
import {
	clearCourse,
	fillBlock,
	fillCourse,
	fillSubscriptionInfo,
	fillSubscriptionPrice
} from "../../redux/actions/create.actions"
import {connect} from "react-redux"
import Block from "../../containers/Create/Blocks"
import getRandomKey from "../../utils/getRandomKey"
import SubscriptionPrice from "../../containers/Create/Subscriptions/SubscriptionPrice"
import useHttp from "../../hooks/http.hook"
import SubscriptionInfo from "../../containers/Create/Subscriptions/SubscriptionInfo"

import config from '../../config.js'

const {storageName} = config

const CreatePage = ({form, clearCourse, fillCourse, fillBlock, fillSubscriptionPrice, fillSubscriptionInfo}) => {
	const [blocks, setBlocks] = useState([])
	const auxiliary = useRef(null)
	const [subscriptionsPrice, setSubscriptionsPrice] = useState([])
	const [subscriptionsInfo, setSubscriptionsInfo] = useState([])
	const request = useHttp()
	
	useEffect(() => {
		setBlocks(prev => [...prev, <Block key={getRandomKey()} props={{indexBlock: 0}}/>])
		setSubscriptionsPrice(prev => [...prev,
			<SubscriptionPrice key={getRandomKey()} props={{indexSubscriptionPrice: 0}}/>])
		setSubscriptionsInfo(prev => [...prev,
			<SubscriptionInfo key={getRandomKey()} props={{indexSubscriptionInfo: 0}}/>])
	}, [])
	
	const changeHandler = ({target: {name, value}}) => {
		fillCourse(name, value)
	}
	
	const fileHandler = ({target: {name, files}}) => {
		const file = [...files].map(f => f.name)[0]
		fillCourse(name, file)
	}
	
	const courseHandler = async ev => {
		ev.preventDefault()
		try {
			const DATA = JSON.parse(localStorage.getItem(storageName)) || {}
			const additionalFormData = new FormData(ev.target)
			const submissionForm = JSON.parse(JSON.stringify(form))
			submissionForm.icon = `files/${submissionForm.keyword}/${submissionForm.icon}`
			submissionForm.blocks.forEach(b => {
				b.lessons.forEach((l, lessonIndex) => {
					l.pdf = l.pdf.map(f => `files/${submissionForm.keyword}/${b.keyword}/${lessonIndex+1}/pdf/${f}`)
					l.audio = l.audio.map(f => `files/${submissionForm.keyword}/${b.keyword}/${lessonIndex+1}/audio/${f}`)
					l.text.forEach(t => {
						t.image = `files/${submissionForm.keyword}/${b.keyword}/${lessonIndex+1}/images/${t.image}`
					})
				})
			})
			const files = [
				{field: 'icon', names: additionalFormData.getAll('icon').map(f => f.name)},
				{field: 'pdf', names: additionalFormData.getAll('pdf').map(f => f.name)},
				{field: 'audio', names: additionalFormData.getAll('audio').map(f => f.name)},
				{field: 'image', names: additionalFormData.getAll('image').map(f => f.name)}
			]
			submissionForm.files = files
			auxiliary.current.value = JSON.stringify(submissionForm)

			const formData = new FormData(ev.target)
			const data = await request(`${config.baseUrl}/api/course/create`, 'POST', formData, {Authorization: `Bearer ${DATA.token}`}, 'SENDFILES')
			setBlocks([<Block key={getRandomKey()} props={{indexBlock: 0}}/>])
			setSubscriptionsPrice([<SubscriptionPrice key={getRandomKey()} props={{indexSubscriptionPrice: 0}}/>])
			setSubscriptionsInfo([<SubscriptionInfo key={getRandomKey()} props={{indexSubscriptionInfo: 0}}/>])
			clearCourse()
			console.log(data)
		} catch (e) {
			console.log(e)
		}
	}
	
	const createBlock = () => {
		fillBlock(null, null, blocks.length)
		setBlocks(prev => [...prev, <Block key={getRandomKey()} props={{indexBlock: prev.length}}/>])
	}
	
	const createSubscriptionPrice = () => {
		fillSubscriptionPrice(null, null, subscriptionsPrice.length)
		setSubscriptionsPrice(prev => [...prev, <SubscriptionPrice key={getRandomKey()} props={{indexSubscriptionPrice: prev.length}}/>])
	}
	
	const createSubscriptionInfo = () => {
		fillSubscriptionInfo(null, subscriptionsInfo.length)
		setSubscriptionsInfo(prev => [...prev, <SubscriptionInfo key={getRandomKey()} props={{indexSubscriptionInfo: prev.length}}/>])
	}
	
	return (
		<form className='auth-form' onSubmit={courseHandler}>
			<input type="hidden" name='data' ref={auxiliary} />
			<h1 className='auth-form__title'>Создание курса</h1>
			<label className='auth-form__label'>
				Ключевое слово КУРСА
				<input
					className='auth-form__input'
					type="text"
					name="keyword"
					value={form.keyword}
					onChange={changeHandler}
					required/>
			</label>
			<label className='auth-form__label'>
				Заголовок КУРСА
				<input
					className='auth-form__input'
					type="text"
					name="title"
					value={form.title}
					onChange={changeHandler}
					required/>
			</label>
			<label className='auth-form__label'>
				иконка КУРСА
				<input
					className='auth-form__input'
					type="file"
					name="icon"
					onChange={fileHandler}
					accept='image/*'
					required/>
			</label>
			<button type='button' onClick={createSubscriptionInfo}>+ subscription info</button>
			{subscriptionsInfo}
			<button type='button' onClick={createSubscriptionPrice}>+ subscription price</button>
			{subscriptionsPrice}
			<button type='button' onClick={createBlock}>+ block</button>
			{blocks}
			<button className='auth-form__button' type="submit">Создать</button>
		</form>
	)
}

const mapStateToProps = ({createForm}) => ({
	form: createForm
})

const mapDispatchToProps = {
	clearCourse, fillCourse, fillSubscriptionPrice, fillSubscriptionInfo, fillBlock
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage)