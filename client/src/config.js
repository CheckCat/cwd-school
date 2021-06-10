const timecodesStateTemplate = {
	'time': '',
	'description': ''
}

const textStateTemplate = {
	'title': '',
	'text': '',
	'image': ''
}

const lessonStateTemplate = {
	'title': '',
	'description': '',
	'video': '',
	'audio': [],
	'pdf': [],
	'timecodes': [timecodesStateTemplate],
	'text': [textStateTemplate]
}

const createBlockStateTemplate = {
	'keyword': '',
	'title': '',
	'lessons': [lessonStateTemplate]
}

const subscriptionStateTemplate = {
	'duration': '',
	'price': ''
}

const config = {
	'storageName': 'userData',
	'baseUrl': 'http://localhost:5001',
	'flaskUrl': 'http://localhost:5000',
	'regSteps': [
		'account',
		'code',
		'form'
	],
	'authStateTemplate': {
		'blockchainAccount': '',
		'password': ''
	},
	'regStateTemplate': {
		'blockchainAccount': 'bombaster322',
		'blockchainId': '123',
		'code': '',
		'password': '12345678910',
		'confirmPassword': '12345678910',
		'telegram': '@oue',
		'email': 'vadimsabi@mail.ru',
		'phone': '+79178003676'
	},
	'createCourseStateTemplate': {
		'keyword': '',
		'title': '',
		'icon': '',
		'blocks': [createBlockStateTemplate],
		'subscriptions': {
			'description': [''],
			'prices': [subscriptionStateTemplate]
		}
	},
	createBlockStateTemplate,
	lessonStateTemplate,
	timecodesStateTemplate,
	textStateTemplate,
	subscriptionStateTemplate
}

export default config