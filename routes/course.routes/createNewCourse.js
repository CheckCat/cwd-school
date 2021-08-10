const fs = require('fs')
const path = require('path')
const Course = require('../../models/Course')
const User = require('../../models/User')

module.exports = async (req, res) => {
    try {
        const {keyword, title, descriptions, prices} = req.body

        const maybe = await Course.findOne({keyword})

        if(maybe) return res.status(300).json({message: 'Такой курс уже существует! Попробуйте использовать другое ключевое слово.'})

        const course = new Course({
            keyword,
            title,
            subscriptionDescription: descriptions,
            subscriptionPrices: prices,
            blocks: []
        })

        await course.save()

        fs.mkdir(path.join(__dirname, '..', '..', 'files', keyword), () => null)

        const admin = await User.findOne({role: 'admin'})
        admin.subscriptions.push({course: course._id, timeframe: new Date(3000, 1, 1)})
        admin.markModified('subscriptions')
        await admin.save()

        return res.status(200).json({message: 'Курс успешно создан!'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
