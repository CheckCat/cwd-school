const {Router} = require('express')
const Subscription = require('../models/Subscription')
const Course = require('../models/Course')
const Lesson = require('../models/Lesson')
const User = require('../models/User')
const identification = require('../middleware/identification.middleware')
const upload = require('../middleware/upload.middleware')
const router = Router()
/*
* {
    "keyword": "a",
    "title": "Привет",
    "lessons": [
        {
            "timecodes": ["a"],
            "audio": "bcdl",
            "pdf": ["h", "i", "j"],
            "text": ["1", "2", "3", "4"]
        },
        {
            "video": "1234",
            "audio": "bcdl",
            "pdf": ["h", "i", "j"],
            "text": ["1", "2", "3", "4"]
        },
        {
            "video": "1234",
            "timecodes": ["a", "b", "c", "g"],
            "audio": "bcdl",
            "pdf": ["h", "i", "j"],
            "text": ["1", "2", "3", "4"]
        }
    ]
}
* */

router.get(
  '/:keyword',
  [],
  // identification,
  async (req, res) => {
    try {
      const course = await Course.findOne({keyword: req.params.keyword})
      if (!course) {
        return res.status(404).json({e: 'Такого курса нет'})
      }
      const lessons = await Lesson.find({owner: req.params.keyword})

      return res.status(200).json({lessons, title: course.title})
    } catch (e) {
      return res.status(500).json({e: 'Что-то пошло не так'})
    }
  })

router.post(
  '/a',[], upload.any(), async (req, res) => {
    try {
      const paths = req.files?.map(el => el.path.split('\\').join('/'))
      console.log(req.body)
      console.log(req.headers)
      return res.status(200).json({message: 'Все круто', body: req.body})
    } catch(e) {
      console.log(e)
      return res.status(400).json({message: 'Ошибка с файлами', body: req.body})
    }
  }
)

// router.post(
//   '',
//   [],
//   // identification,
//   upload,
//   async (req, res) => {
//     try {
//       /*
//         * keyword - string
//         * title - string
//         * lessons - array
//         * lessons>child - object
//         * >
//         * video - string
//         * timecodes - array > string
//         * audio - string/file
//         * pdf - array > string/file
//         * text - array > string
//       */
//       body = req.body
//
//       const possible = await Course.findOne({keyword: body.keyword})
//
//       if (possible) {
//         return res.status(400).json({e: 'Курс с таким ключевым словом уже существует'})
//       }
//
//       const lessons = []
//
//       body.lessons.forEach(async el => {
//         if (!el.video) {
//           delete el.timecodes
//         }
//         const lesson = new Lesson({...el, owner: body.keyword})
//         lessons.push(lesson)
//
//         await lesson.save()
//       })
//
//       const course = new Course({
//         keyword: body.keyword,
//         title: body.title,
//         lessons: lessons.map(l => l._id)
//       })
//
//       await course.save()
//
//       body.subscriptions.forEach(async ({duration, price}) => {
//         const subscription = new Subscription({
//           course: course.id,
//           duration: duration,
//           price: price
//         })
//
//         await subscription.save()
//       })
//
//       const admin = await User.findOne({role: 'admin'})
//       admin.subscriptions.set(course._id, new Date(3000, 1, 11))
//
//       await admin.save()
//
//       return res.status(201).json({message: 'Курс был создан'})
//     } catch (e) {
//       console.log(e)
//       return res.status(500).json({e: 'Что-то пошло не так'})
//     }
//   })

router.put(
  '',
  [],
  // identification,
  async (req, res) => {
    try {
      /*
        * newKeyword - string
        * oldKeyword - string
        * title - string
        * lessons - array
        * lessons>child - object
        * >
        * video - string
        * timecodes - array > string
        * audio - string/file
        * pdf - array > string/file
        * text - array > string
      */
      body = req.body
      await Lesson.deleteMany({owner: body.oldKeyword})
      body.lessons.forEach(async el => {
        if (!el.video) {
          delete el.timecodes
        }

        const lesson = new Lesson({...el, owner: body.newKeyword})

        await lesson.save()
      })

      // const lessons = await Lesson.find({owner: body.newKeyword})
      const course = await Course.findOne({keyword: body.oldKeyword})
      course.keyword = body.newKeyword
      course.title = body.title
      // course.lessons = lessons.map(l => l.id)
      // course.markModified('lessons')
      await course.save()
      return res.status(202).json({message: 'Курс был обновлен'})
    } catch (e) {
      console.log(e)
      return res.status(500).json({e: 'Что-то пошло не так'})
    }
  })

router.delete(
  '',
  [],
  // identification,
  async (req, res) => {
    try {
      /*
        * keyword - string
      */
      body = req.body
      await Lesson.deleteMany({owner: body.keyword})
      const course = await Course.findOneAndDelete({keyword: body.keyword})
      const users = await User.find()
      users.forEach(async u => {
        delete u.subscriptions[course.id.toString()]
        u.markModified('subscriptions')
        await u.save()
      })
      await Subscription.deleteMany({course: course.id})
      return res.status(202).json({message: 'Подписка успешно удалена'})
    } catch (e) {
      console.log(e)
      return res.status(500).json({e: 'Что-то пошло не так'})
    }
  })

module.exports = router