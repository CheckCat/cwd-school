import React from 'react'
import './index.css'

const MiniLoader = () => {
	return (
		<>
			<svg className='mini' xmlns="http://www.w3.org/2000/svg" width="50" height="50">
				<circle id="arc1" className="circle" cx="25" cy="25" r="20" opacity=".89" fill="none" stroke="#632b26"
								strokeWidth="2" strokeLinecap="square" strokeOpacity=".99213" paintOrder="fill markers stroke"/>
				<circle id="arc2" className="circle" cx="25" cy="25" r="20" opacity=".49" fill="none" stroke="#632b26"
								strokeWidth="1.3" strokeLinecap="square" strokeOpacity=".99213" paintOrder="fill markers stroke"/>
				<circle id="arc3" className="circle" cx="25" cy="25" r="16.7" opacity=".49" fill="none" stroke="#632b26"
								strokeWidth="3.33" strokeLinecap="square" strokeOpacity=".99213" paintOrder="fill markers stroke"/>
				<circle id="arc4" className="circle" cx="25" cy="25" r="20" opacity=".49" fill="none" stroke="#632b26"
								strokeWidth="5" strokeLinecap="square" strokeOpacity=".99213" paintOrder="fill markers stroke"/>
				<circle id="arc5" className="circle" cx="25" cy="25" r="16.7" opacity=".89" fill="none" stroke="#632b26"
								strokeWidth="1.33" strokeLinecap="square" strokeOpacity=".99213" paintOrder="fill markers stroke"/>
				<circle id="arc6" className="circle" cx="25" cy="25" r="15" opacity=".49" fill="none" stroke="#632b26"
								strokeWidth="2.66" strokeLinecap="square" strokeOpacity=".99213" paintOrder="fill markers stroke"/>
				<circle id="arc7" className="circle" cx="25" cy="25" r="15" opacity=".89" fill="none" stroke="#632b26"
								strokeWidth="1.33" strokeLinecap="square" strokeOpacity=".99213" paintOrder="fill markers stroke"/>
				<circle id="arc8" className="circle" cx="25" cy="25" r="13.33" opacity=".79" fill="#4DD0E1"
								fillOpacity="0" stroke="#632b26" strokeWidth="1.33" strokeLinecap="square" strokeOpacity=".99213"
								paintOrder="fill markers stroke"/>
			</svg>
		</>
	);
}

export default MiniLoader
