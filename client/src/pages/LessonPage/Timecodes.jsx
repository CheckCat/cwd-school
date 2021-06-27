import React from 'react';
import getRandomKey from "../../utils/getRandomKey";

const Timecodes = ({timecodes}) => {
	return (
		<div className='timecodes-wrapper'>
			<h3 className='timecodes-title'>О чем этот урок?</h3>
			<ul className='timecodes'>
				{timecodes.map(({time, description}) => {
					return (
						<li className='timecodes__elem' key={getRandomKey()}>
							<p className='timecodes__time'>{time}</p>
							<p className='timecodes__description'>{description}</p>
						</li>
					)
				})}
			</ul>
		</div>
	);
}

export default Timecodes;