import React from 'react';
import './index.css'
import {Link} from "react-router-dom";

const Ask = ({isAuthenticated}) => {
	return (
		<section className='ask'>
			<div className="ask__container">
				<h2 className='ask__title'>Это все?</h2>
				<div className='ask__wrapper'>
					<p className='ask__text'><b>
						<mark>Впечатлены?</mark>
					</b> Неудивительно. Ведь эта инновация — не просто какая-то громоздкая
						альтернатива Google Sheets. Любой может загрузить блокчейн и запустить его полную
						копию на своем компьютере. Все благодаря программному обеспечению,
						о котором мы упоминали ранее.
					</p>
					<p className="ask__text">Предположим, что вы и ваши друзья Алиса, Дима, Катя и Вова запускаете программу.
						Вы говорите: <i>
							<mark>«Я хочу отправить Диме пять монет»</mark>
						</i>.
						Вы отправляете эту команду всем остальным, <i>
							<mark>но монеты не отправляются</mark>
						</i> Диме <i>
							<mark>сразу</mark>
						</i>.
					</p>
					<p className="ask__text">
						В это же время Катя решает отправить пять монет Алисе.
						Она также отправляет свою команду в сеть. В любой момент участник сети может
						собрать все команды, ожидающие исполнения, и создать блок.
					</p>
					<p className="ask__text ask__text_circle ask__text_green_bold_italic">Если блок может сделать любой человек,
						что мешает им жульничать?</p>
					<p className="ask__text">
						Идея создать блок с командой «Дима платит мне миллион монет»
						кажется очень соблазнительной. Так же, как купить Lamborghini и шубу у Кати,
						совершая операции со средствами, которыми вы не владеете.
					</p>
					<p className="ask__text">
						Но это так не работает. Благодаря криптографии, теории игр и тому, что называется
						алгоритмом консенсуса, система не позволяет вам тратить средства,
						которых у вас на самом деле нет.
					</p>
					<p className="ask__text ask__text_green_bold_italic">Об этом и многом другом мы поговорим в нашем
						обучении.</p>
				</div>
			</div>
			<Link className='btn-continue ask__btn-continue'
						to={isAuthenticated ? '/buy' : '/auth'}>{isAuthenticated ? 'Приобрести' : 'Авторизоваться'}</Link>
		</section>
	);
}

export default Ask;