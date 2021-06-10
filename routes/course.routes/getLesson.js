const Course = require('../../models/Course')
const Block = require('../../models/Block')
const Lesson = require('../../models/Lesson')

module.exports = async (req, res) => {
	try {
		const keyword = req.params.keyword
		const blockKey = req.params.blockKey
		const lessonKey = req.params.lessonKey
		
		const course = await Course.findOne({keyword})
		if (!course) {
			return res.status(404).json({message: 'Такого курса нет'})
		}
		
		const block = await course.blocks.reduce(async (accum, id) => {
			const possible = await Block.findById(id)
			if (possible.keyword === blockKey) return possible
			return accum
		}, {lessons: []})
		
		const lesson = await block.lessons.reduce(async (accum, id, index) => {
			if (index + 1 !== +lessonKey) return accum
			const {audio, pdf, title, description, video, timecodes, text} = await Lesson.findById(id)
			return {audio, pdf, title, description, video, timecodes, text}
		}, {})

		return res.status(200).json({lesson, title: block.title})
	} catch (e) {
		console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так'})
	}
}