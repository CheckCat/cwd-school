const {mkdirSync, rename} = require('fs')
const config = require('config')

const {temporaryStorage, endPoint} = config

const inLesson = (l, name) => {
	return (l.pdf.find(f => new RegExp(name).test(f)) || l.audio.find(f => new RegExp(name).test(f)) || l.text.find(t => new RegExp(name).test(t.image)))
}

const findBlockKey = (data, name) => {
	return data.blocks.find(b => b.lessons.find(l => inLesson(l, name))).keyword
}

const findLessonIndex = (data, name, blockKey) => {
	return data.blocks.find(b => b.keyword === blockKey).lessons.findIndex(l => inLesson(l, name)) + 1
}

const dragAndDropFiles = (data, fromDir, toDir) => {
	data.files.forEach(({field, names}) => {
		switch (field) {
			case 'icon':
				rename(`${fromDir}/${names[0]}`, `${toDir}/${data.keyword}/${names[0]}`, () => null)
				break
			case 'pdf':
				names.forEach(n => {
					const blockKey = findBlockKey(data, n)
					const lessonKey = findLessonIndex(data, n, blockKey)
					rename(`${fromDir}/${n}`, `${toDir}/${data.keyword}/${blockKey}/${lessonKey}/pdf/${n}`, () => null)
				})
				break
			case 'audio':
				names.forEach(n => {
					const blockKey = findBlockKey(data, n)
					const lessonKey = findLessonIndex(data, n, blockKey)
					rename(`${fromDir}/${n}`, `${toDir}/${data.keyword}/${blockKey}/${lessonKey}/audio/${n}`, () => null)
				})
				break
			case 'image':
				names.forEach(n => {
					const blockKey = findBlockKey(data, n)
					const lessonKey = findLessonIndex(data, n, blockKey)
					rename(`${fromDir}/${n}`, `${toDir}/${data.keyword}/${blockKey}/${lessonKey}/images/${n}`, () => null)
				})
				break
			default:
				return
		}
	})
}

module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}
	
	try {
		const data = JSON.parse(req.body.data)
		
		data.blocks.forEach(b => {
			mkdirSync(`files/${data.keyword}/${b.keyword}`, {recursive: true})
			b.lessons.forEach((_, lessonIndex) => {
				mkdirSync(`files/${data.keyword}/${b.keyword}/${lessonIndex + 1}/pdf`, {recursive: true})
				mkdirSync(`files/${data.keyword}/${b.keyword}/${lessonIndex + 1}/audio`, {recursive: true})
				mkdirSync(`files/${data.keyword}/${b.keyword}/${lessonIndex + 1}/images`, {recursive: true})
			})
		})

		dragAndDropFiles(data, temporaryStorage, endPoint)
		
		next()
	} catch {
		return res.status(400).json({message: 'При создании файлов произошла ошибка'})
	}
}