const fetch = require('node-fetch')
const User = require('../models/User')
const Course = require('../models/Course')
const MaxOp = require('../models/MaxOp')

module.exports = async max_op => {
  // try {
  //   const response = await fetch('http://localhost:5000/api/get_subscriptions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       max_op
  //     })
  //   })
  //   const data = await response.json()
  //
  //   if (data.subscriptions.length) {
  //     data.subscriptions.forEach(async ({buyer, amount}) => {
  //         const user = await User.findOne({blockchainId: buyer})
  //         if (!user) return
  //
  //         const courses = await Course.find()
  //         const course = courses.find(c => c.subscriptions.find(s => s.price === amount))
  //         if (!course) return
  //
  //         user.subscriptions.forEach(async (sub) => {
  //           if(sub.course === course.id) {
  //             const oldDuration = sub.timeframe
  //             const date =
  //               oldDuration.getTime() < Date.now()
  //                 ?
  //                 new Date().setMonth(new Date().getMonth() + subscription.duration)
  //                 :
  //                 oldDuration.setMonth(oldDuration.getMonth() + subscription.duration)
  //               user.markModified('subscriptions')
  //             await user.save()
  //           }
  //         })
  //
  //           return
  //         }
  //
  //         const date = new Date().setMonth(new Date().getMonth() + subscription.duration)
  //
  //         user.subscriptions[subscription.course.toString()] = new Date(date)
  //         user.markModified('subscriptions')
  //         await user.save()
  //       }
  //     )
  //   }
  //
  //   if (data.max_op !== max_op) {
  //     const maxOpModel = await MaxOp.findOne({maxOp: max_op})
  //     maxOpModel.maxOp = data.max_op
  //     await maxOpModel.save()
  //   }
  //
  //   setTimeout(getSubs, 61000, data.max_op)
  // } catch
  //   (e) {
  //   console.log(e)
  //   setTimeout(getSubs, 61000, max_op)
  // }
}

