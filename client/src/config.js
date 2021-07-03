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

const owner = "school1"

const config = {
	'storageName': 'userData',
	// 'baseUrl': 'http://crowdskills-blockchain.info:80',
	// 'flaskUrl': 'http://crowdskills-blockchain.info:81',
	'baseUrl': 'http://localhost:5001',
	'flaskUrl': 'http://localhost:5001',
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
		'blockchainAccount': '',
		'blockchainId': '',
		'code': '',
		'password': '',
		'confirmPassword': '',
		'telegram': '',
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
