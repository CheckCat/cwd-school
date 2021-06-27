const {createReadStream} = require('fs')

module.exports = async (req, res) => {
	const {course, block, lesson, type, filename} = req.params
	try {
		const fileStream = createReadStream(`files/${course}/${block}/${lesson}/${type}/${filename}`);
		
		fileStream.on('open', () => {
			const type = filename.split('.')[1]
			console.log(type)
			switch (type) {
				case 'pdf':
					res.contentType('application/pdf')
					break
				case 'mp3':
					res.contentType('audio/mpeg')
					break
				case 'mp4':
					res.contentType('audio/mp4')
					break
				case 'jpg':
					res.contentType('image/JPEG')
					break
				default:
					res.contentType('application/json')
			}
			fileStream.pipe(res);
		})
		fileStream.on('error', (e) => {
			console.log(e)
			return res.status(402).json({message: 'Ошибка при получении файла!'})
		})
	} catch (e) {
		return res.status(400).json({message: 'Что-то пошло не так!'})
	}
}