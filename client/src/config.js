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
	// Urls for dev
	// 'clientUrl': 'http://localhost:3000',
	// 'baseUrl': 'http://localhost:5000',
	// 'flaskUrl': 'http://localhost:5001',
	// Urls for prod
	'clientUrl': 'https://crowdskills-blockchain.info',
	'baseUrl': 'https://crowdskills-blockchain.info',
	'flaskUrl': 'https://crowdskills-blockchain.info/python',
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
