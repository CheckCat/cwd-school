const {Router} = require('express')
const router = Router()

const auth = require('../../middleware/auth.middleware')
const identification = require('../../middleware/identification.middleware')
const fileWorker = require('../../middleware/file.middleware')
const editFileWorker = require('../../middleware/edit.file.middleware')
const checkCourse = require('../../middleware/course.middleware')
const upload = require('../../middleware/upload.middleware')
const editUpload = require('../../middleware/edit.upload.middleware')

const createCourse = require('./createCourse')
const createNewCourse = require('./createNewCourse')
const deleteCourse = require('./deleteCourse')
const editCourse = require('./editCourse')

const createBlock = require('./createBlock')
const deleteBlock = require('./deleteBlock')
const editBlock = require('./editBlock')

const createLesson = require('./createLesson')
const deleteLesson = require('./deleteLesson')
const editLesson = require('./editLesson')

const getBlock = require('./getBlock')
const getLesson = require('./getLesson')
const getCourses = require('./getCourses')
const getCourse = require('./getCourse')


router.get(
	'',
	[],
	getCourses
)
router.get(
	'/:keyword',
	identification,
	getCourse
)
router.get(
	'/:keyword/:blockKey',
	auth,
	getBlock
)
router.get(
	'/:keyword/:blockKey/:lessonKey',
	auth,
	getLesson
)

router.post(
	'/create',
	upload.any(),
	identification,
	checkCourse,
	fileWorker,
	createCourse
)

router.post(
	'/create_course',
	identification,
	createNewCourse
)

router.post(
	'/create_block/:courseKey',
	identification,
	createBlock
)

router.post(
	'/create_lesson/:courseKey/:blockKey',
	identification,
	createLesson
)

router.put(
	'/:courseKey',
	identification,
	editCourse
)

router.put(
	'/:courseKey/:blockKey',
	identification,
	editBlock
)

router.put(
	'/:courseKey/:blockKey/:index',
	editUpload.any(),
	editFileWorker,
	editLesson
)

router.delete(
	'/:courseKey',
	[],
	identification,
	deleteCourse
)

router.delete(
	'/:courseKey/:blockKey',
	[],
	identification,
	deleteBlock
)

router.delete(
	'/:courseKey/:blockKey/:index',
	[],
	identification,
	deleteLesson
)

module.exports = router
