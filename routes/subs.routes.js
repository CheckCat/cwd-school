const {Router} = require('express')
const Subscription = require('../models/SubscriptionPrice')
const Course = require('../models/Course')
const identification = require('../middleware/identification.middleware')
const router = Router()

router.get(
	'/:keyword',
	[],
	// identification,
	async (req, res) => {
		try {
			const course = await Course.findOne({keyword: req.params.keyword})
			if (!course) {
				return res.status(404).json({e: 'Такого курса нет'})
			}
			const subscriptions = await Subscription.find({course: course.id})
			const resBody = subscriptions.map(({duration, price}) => ({duration, price}))
			return res.status(200).json({resBody})
		} catch (e) {
			return res.status(500).json({e: 'Что-то пошло не так'})
		}
	})

router.post(
	'',
	[],
	// identification,
	async (req, res) => {
		try {
			/*
				* keyword - string
				* duration - number
				* price - number
			*/
			body = req.body
			const course = await Course.findOne({keyword: body.keyword})
			const subscription = new Subscription({
				course: course.id,
				duration: body.duration,
				price: body.price
			})
			await subscription.save()
			return res.status(201).json({message: 'Подписка была создана'})
		} catch (e) {
			console.log(e)
			return res.status(500).json({e: 'Что-то пошло не так'})
		}
	})

router.put(
	'',
	[],
	// identification,
	async (req, res) => {
		try {
			/*
				* duration - number
				* price - number
				* oldPrice - number
			*/
			body = req.body
			const subscription = await Subscription.findOne({price: body.oldPrice})
			subscription.duration = body.duration
			subscription.price = body.price
			await subscription.save()
			return res.status(202).json({message: 'Подписка была обновлена'})
		} catch (e) {
			return res.status(500).json({e: 'Что-то пошло не так'})
		}
	})

router.delete(
	'',
	[],
	// identification,
	async (req, res) => {
		try {
			/*
				* price - number
			*/
			body = req.body
			await Subscription.deleteOne({price: body.price})
			
			return res.status(202).json({message: 'Подписка успешно удалена'})
		} catch (e) {
			return res.status(500).json({e: 'Что-то пошло не так'})
		}
	})

module.exports = router