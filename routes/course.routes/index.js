const {Router} = require('express')

const Course = require('../../models/Course')
const Block = require('../../models/Block')
const Lesson = require('../../models/Lesson')
const User = require('../../models/User')
const auth = require('../../middleware/auth.middleware')
const identification = require('../../middleware/identification.middleware')
const fileWorker = require('../../middleware/file.middleware')
const checkCourse = require('../../middleware/course.middleware')
const upload = require('../../middleware/upload.middleware')
const create = require('./create')
const getBlock = require('./getBlock')
const getLesson = require('./getLesson')
const router = Router()

router.get(
	'/:keyword/:blockKey',
	[],
	auth,
	getBlock
)
router.get(
	'/:keyword/:blockKey/:lessonKey',
	[],
	auth,
	getLesson
)

router.post(
	'/create',
	upload.any(),
	identification,
	checkCourse,
	fileWorker,
	create
)

router.put(
	'',
	[],
	// identification,
	async (req, res) => {
		try {
			// body = req.body
			// await Lesson.deleteMany({owner: body.oldKeyword})
			// body.lessons.forEach(async el => {
			//   if (!el.video) {
			//     delete el.timecodes
			//   }
			//
			//   const lesson = new Lesson({...el, owner: body.newKeyword})
			//
			//   await lesson.save()
			// })
			
			// const lessons = await Lesson.find({owner: body.newKeyword})
			const course = await Course.findOne({keyword: body.oldKeyword})
			course.keyword = body.newKeyword
			course.title = body.title
			// course.lessons = lessons.map(l => l.id)
			// course.markModified('lessons')
			await course.save()
			return res.status(202).json({message: 'Курс был обновлен'})
		} catch (e) {
			console.log(e)
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
				* keyword - string
			*/
			// body = req.body
			await Lesson.deleteMany({owner: body.keyword})
			const course = await Course.findOneAndDelete({keyword: body.keyword})
			const users = await User.find()
			// users.forEach(async u => {
			//   delete u.subscriptions[course.id.toString()]
			//   u.markModified('subscriptions')
			//   await u.save()
			// })
			await Subscription.deleteMany({course: course.id})
			return res.status(202).json({message: 'Подписка успешно удалена'})
		} catch (e) {
			console.log(e)
			return res.status(500).json({e: 'Что-то пошло не так'})
		}
	})

module.exports = router