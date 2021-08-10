const Excel = require('exceljs')
const path = require('path')
const {createReadStream, unlinkSync} = require('fs')
const config = require('config')

module.exports = async (req, res) => {
    try {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Список учеников');
        const {students: data, courses} = req.body
        const validateData = data.map((
            {
                blockchainAccount: login,
                telegram,
                theme,
                subscriptions,
            }, index) => {
            let validateSubscriptions = {}

            subscriptions.forEach(({course, timeframe, isExpired}) => {
                if (!course) return

                const date = new Date(timeframe)
                const year = date.getFullYear()
                let month = `${date.getMonth() + 1}`
                month.length === 1 && (month = '0' + month)
                let day = `${date.getDate()}`
                day.length === 1 && (day = '0' + day)
                validateSubscriptions[course] = isExpired ? `Просрочено - ${day}.${month}.${year}` : `Действует - ${day}.${month}.${year}`
            })

            courses.forEach(c => {
                if(!validateSubscriptions[c]) {
                    validateSubscriptions[c] = 'Никогда не оплачивал'
                }
            })

            return {
                index: index+1, login, telegram, theme, ...validateSubscriptions
            }
        })

        worksheet.columns = [
            { header: 'Номер', key: 'index', width: 10, style: { font: { name: 'Roboto' } } },
            { header: 'Логин', key: 'login', width: 21, style: { font: { name: 'Roboto' } } },
            { header: 'Телеграм', key: 'telegram', width: 21, style: { font: { name: 'Roboto' } } },
            { header: 'Тема', key: 'theme', width: 7, style: { font: { name: 'Roboto' } } },
            ...courses.map( course => ( { header: course, key: course, width: 30, style: { font: { name: 'Roboto' } } } ) )
        ];
        validateData.forEach(r => worksheet.addRow(r).commit())
        const pathToExcel = path.join(__dirname, '..', '..', config.get('temporaryStorage'), 'Список.xlsx')
        await workbook.xlsx.writeFile(pathToExcel);

        const sendFile = () => {
            const fileStream = createReadStream(pathToExcel)
            res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            fileStream.on('open', () => {
                fileStream.pipe(res);
            })
            fileStream.on('close', () => {
                unlinkSync(pathToExcel)
            })
            fileStream.on('error', (e) => {
                console.log(e)
                return res.status(402).json({message: 'Ошибка при получении Excel-файла!'})
            })
        }
        sendFile()
    } catch(e) {
        console.log(e)
        return res.status(500).json({message: 'Что-то пошло не так!', error: e})
    }
}
