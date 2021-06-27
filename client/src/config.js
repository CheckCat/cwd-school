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

const owner = "bombaster228"

const config = {
	'storageName': 'userData',
	'baseUrl': 'http://localhost:5001',
	'flaskUrl': 'http://localhost:5000',
	'paymentUrlTemplate': `https://cwd.global/shopping/payment?to_name=${owner}&amount=`,
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
		'blockchainId': '',
		'code': '',
		'password': '12345678910',
		'confirmPassword': '12345678910',
		'telegram': '@oue',
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