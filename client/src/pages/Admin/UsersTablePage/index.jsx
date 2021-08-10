import React, {useEffect, useRef, useState} from 'react';
import './index.css'
import useHttp from "../../../hooks/http.hook";
import config from "../../../config";

const UsersTablePage = ({courses, token}) => {
    const [initialStudents, setInitialStudents] = useState([])
    const [students, setStudents] = useState([])
    const [flags, setFlags] = useState([])
    const [isReverse, setIsReverse] = useState(false)
    const [filterInputValue, setFilterInputValue] = useState('')
    const request = useHttp()
    const filterInput = useRef()
    const [activeTarget, setActiveTarget] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [currentType, setCurrentType] = useState('')

    const words = {
        login: 'логину',
        theme: 'теме',
        telegram: 'телеграму',
    }

    const flagsValue = [0, 1, 2]

    useEffect(() => {
        if (filterInputValue === '') return setStudents(initialStudents)
        switch (currentType) {
            case 'login':
                setStudents(() => initialStudents.filter(({blockchainAccount}) => blockchainAccount.includes(filterInputValue)))
                break
            case 'telegram':
                setStudents(() => initialStudents.filter(({telegram}) => telegram.includes(filterInputValue)))
                break
            case 'theme':
                setStudents(() => initialStudents.filter(({theme}) => theme.includes(filterInputValue)))
                break
            default:
                return
        }
    }, [filterInputValue, setStudents, initialStudents])


    const switchTypeHandler = (type) => {
        if (currentType === type) return
        setActiveTarget(type)
        setCurrentType(type)
        setIsOpen(true)
        setFilterInputValue('')
    }

    const sortFields = ({target}, type) => {
        const index = target.dataset.index

        setStudents(prev => {
            let expired = []
            let noExpired = []
            let nonHaveSub = []
            prev.forEach(arr => {
                if(arr.subscriptions[index]?.isExpired) {
                    return expired.push(arr)
                }
                if(arr.subscriptions[index]?.isExpired === false) {
                    return noExpired.push(arr)
                }
                nonHaveSub.push(arr)
            })
            switch (flags[index]) {
                case 0:
                    return [...expired, ...noExpired, ...nonHaveSub]
                    break
                case 1:
                    return [...noExpired, ...nonHaveSub, ...expired]
                    break
                case 2:
                    return [...nonHaveSub, ...noExpired, ...expired]
                    break
                default:
                    return prev
            }
        })
        setFlags(prev => {
            const next = [...prev]
            switch (prev[index]) {
                case 0:
                    next[index] = 1
                    break
                case 1:
                    next[index] = 2
                    break
                case 2:
                    next[index] = 0
                    break
                default:
                    return next
            }
            return next
        })
    }

    const sortIndex = () => {
        setStudents(prev => prev.reverse())
        setIsReverse(prev => !prev)
    }

    const uploadExcel = async () => {
        const blob = await request(`${config.baseUrl}/api/excel`, 'POST', {students, courses: courses.map(({keyword}) => keyword)}, {Authorization: `Bearer ${token}`}, 'GETFILES', true)
        const url = URL.createObjectURL(blob)
        const downloadBtn = document.createElement('a')
        console.dir(downloadBtn)
        downloadBtn.href = url
        downloadBtn.download = true
        document.querySelector('html').append(downloadBtn)
        downloadBtn.click()
        downloadBtn.remove()
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await request(`${config.baseUrl}/api/users/all`, 'GET', null, {Authorization: `Bearer ${token}`})
            if (!data) return
            setInitialStudents(data.users)
            setStudents(data.users)
            setFlags(courses.map(() => 2))
        }
        fetchData()
    }, [request, setStudents])

    return (
        <div style={{marginLeft: '22%', minWidth: `${courses.length * 11 + 75}%`, height: '100%'}}>
        <h1 className='students-list__header'>Список студентов</h1>
                <input
                    className='search-input'
                    value={filterInputValue}
                    ref={filterInput}
                    disabled={!isOpen}
                    onChange={({target}) => setFilterInputValue(target.value)}
                    type="text"
                    placeholder={isOpen ? `Поиск по ${words[currentType]}` : 'Для поиска нажмите на заголовок нужного столбца'}
                />
            <button id='top' className='excel-btn' onClick={uploadExcel}>Загрузить Excel</button>
            <table className='table'>
                <tbody className='table__body'>
                <tr className='table__row'>
                    <th className='table__header' onClick={sortIndex}
                        style={students.length === 0 ? {borderBottom: '2px solid var(--main-green-color)'} : {}}>Номер
                    </th>
                    {students.map((_, i, array) => <td
                        className='table__elem'>#{isReverse ? array.length - i : i + 1}</td>)}
                </tr>
                <tr className='table__row'>
                    <th onClick={() => switchTypeHandler('login')}
                        className={activeTarget === 'login' ? 'table__header table__header_active' : 'table__header'}
                        style={students.length === 0 ? {borderBottom: '2px solid var(--main-green-color)'} : {}}>Логин
                    </th>
                    {students.map(({blockchainAccount}) => <td className='table__elem'>{blockchainAccount}</td>)}
                </tr>
                <tr className='table__row'>
                    <th onClick={() => switchTypeHandler('telegram')}
                        className={activeTarget === 'telegram' ? 'table__header table__header_active' : 'table__header'}
                        style={students.length === 0 ? {borderBottom: '2px solid var(--main-green-color)'} : {}}>Telegram
                    </th>
                    {students.map(({telegram}) => <td className='table__elem'>{telegram}</td>)}
                </tr>
                <tr className='table__row'>
                    <th onClick={() => switchTypeHandler('theme')}
                        className={activeTarget === 'theme' ? 'table__header table__header_active' : 'table__header'}
                        style={students.length === 0 ? {borderBottom: '2px solid var(--main-green-color)'} : {}}>Тема
                    </th>
                    {students.map(({theme}) => <td className='table__elem'>{theme}</td>)}
                </tr>
                {courses.map(({keyword}, i) => (
                    <tr className='table__row table__row-course-name'>
                        <th onClick={(ev) => sortFields(ev, keyword)} data-index={i} data-flag='true'
                            className='table__header table__header_course-name'
                            style={students.length === 0 ? {borderBottom: '2px solid var(--main-green-color)'} : {}}>{keyword} -
                            курс
                        </th>
                        {students.map(({subscriptions}) => {
                            const subscription = subscriptions.find(({course}) => course === keyword)
                            if (!subscription) return <td className='table__elem table__elem_not-exist'>Никогда не
                                оплачивал</td>
                            const date = new Date(subscription.timeframe)
                            const year = date.getFullYear()
                            let month = `${date.getMonth() + 1}`
                            month.length === 1 && (month = '0' + month)
                            let day = `${date.getDate()}`
                            day.length === 1 && (day = '0' + day)
                            return <td
                                className={subscription.isExpired ? 'table__elem table__elem_expired' : 'table__elem table__elem_not-expired'}>{subscription.isExpired ? `Просрочено - ${day}.${month}.${year}` : `Действует - ${day}.${month}.${year}`}</td>
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTablePage;
