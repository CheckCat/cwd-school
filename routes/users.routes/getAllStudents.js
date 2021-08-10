const User = require('../../models/User')
const Course = require('../../models/Course')

module.exports = async (req, res) => {
    try {
        const users = await User.find({role: 'student'})
        const students = await Promise.all(users.map(async ({telegram, blockchainAccount, subscriptions, theme}) => {
            const newSubscriptions = await Promise.all(subscriptions.map(async ({course, timeframe}) => {
                const courseState = await Course.findById(course)
                const isExpired = Number(timeframe) <= Date.now()

                return {course: courseState.keyword, timeframe, isExpired}
            }))
            return {telegram, blockchainAccount, theme, subscriptions: newSubscriptions}
        }))
        return res.status(200).json({users: students})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
