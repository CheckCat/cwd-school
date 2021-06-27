const Course = require('../../models/Course')
const Block = require('../../models/Block')
const Lesson = require('../../models/Lesson')

module.exports = async (req, res) => {
	try {
		const keyword = req.params.keyword
		const blockKey = req.params.blockKey
		
		const course = await Course.findOne({keyword})
		if (!course) {
			return res.status(404).json({message: 'Такого курса нет'})
		}
		
		const block = await course.blocks.reduce(async (accum, id) => {
			const possible = await Block.findById(id)
			if (possible.keyword === blockKey) return possible
			return accum
		}, {lessons: []})
		
		const lessons = await Promise.all(block.lessons.map(async (id, index) => {
			const {title, description} = await Lesson.findById(id)
			return {title, description, index: index + 1}
		}))
		
		return res.status(200).json({lessons, courseTitle: course.title, blockTitle: block.title})
	} catch (e) {
		console.log(e)
		return res.status(500).json({message: 'Что-то пошло не так!'})
	}
}