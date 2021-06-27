import React from 'react';
import './index.css'

const ModalWindow = ({message: {message, isError}}) => {
	return (
		<div className={isError ? 'modal-window modal-window_error' : 'modal-window modal-window_success'}>
			{message}
		</div>
	);
}

export default ModalWindow;