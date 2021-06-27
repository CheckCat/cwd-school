import React from 'react';
import './index.css'

const Advantages = ({theme}) => {
	return (
		<section className="advantages">
			<h2 className='advantages__title'>Криптовалюта</h2>
			<ul className='advantages__list'>
				<li className='advantages__elem'>
					<h3 className='advantages__advantage'>Свободна от ограничений</h3>
					<div className="advantages__wrapper">
						<img className='advantages__image' src={`${theme}-images/infinity.png`} alt="Бесконечность"/>
						<p className='advantages__description'>
							Вы можете использовать криптовалюту беспрепятственно.
							Централизованные платежные сервисы в свою очередь могут замораживать
							учетные записи или препятствовать совершению транзакций.
						</p>
					</div>
				</li>
				<li className='advantages__elem'>
					<h3 className='advantages__advantage'>Устойчива к взлому</h3>
					<div className="advantages__wrapper">
						<img className='advantages__image' src={`${theme}-images/guard.png`} alt="Защита"/>
						<p className='advantages__description'>
							Устройство сети делает ее устойчивой к атакам хакеров
							и других злоумышленников.
						</p>
					</div>
				</li>
				<li className='advantages__elem'>
					<h3 className='advantages__advantage'>Дешевый и быстрый способ оплаты</h3>
					<div className="advantages__wrapper">
						<img className='advantages__image' src={`${theme}-images/tick.png`} alt="Оплата"/>
						<p className='advantages__description'>
							Человек на другом конце света может получить от вас средства в считанные
							секунды. Комиссия за транзакцию значительно меньше, чем комиссия
							за международный денежный перевод.
						</p>
					</div>
				</li>
				<li className='advantages__elem'>
					<h3 className='advantages__advantage'>Что такое блокчейн?</h3>
					<div className="advantages__wrapper">
						<img className='advantages__image' src={`${theme}-images/web.png`} alt="Сеть"/>
						<div className='advantages__descriptions'>
							<p className='advantages__description'>
								Не пугайтесь обилия технических терминов, которые используются
								для описания «блокчейна».
								Блокчейн – своеобразная база данных. Это просто набор
								ячеек в электронной таблице.
							</p>
							<p className='advantages__description'>
								У этой базы данных есть некоторые особенности.
								Во-первых, данные блокчейна нельзя изменить.
								Это значит, что вы можете только добавить новую информацию
								— невозможно просто щелкнуть ячейку и удалить или изменить
								в ней данные.
							</p>
							<p className='advantages__description'>
								Во-вторых, каждая запись (называемая блоком) в базе данных криптографически связана с предыдущей
								записью.
								Проще говоря, каждая новая запись должна содержать своего рода
								цифровой отпечаток (хеш) последней записи.
							</p>
							<p className='advantages__description'>
								Вот и все! Поскольку каждый новый отпечаток связан с последним,
								в итоге получается цепочка блоков.
								Или, на сленге крутых ребят, блокчейн.
							</p>
							<p className='advantages__description'>
								Блокчейн неизменяем: если изменяется блок, то меняется отпечаток.
								И поскольку этот отпечаток входит в следующий блок, следующий
								блок тоже изменяется.
							</p>
							<p className='advantages__description'>
								А поскольку отпечаток этого блока... ну, вы поняли.
								В итоге получается эффект домино, а любое изменение становится очевидным.
								Вы не можете изменить какую-либо информацию незаметно для всех.
							</p>
						</div>
					</div>
				</li>
			</ul>
		</section>
	);
}

export default Advantages;