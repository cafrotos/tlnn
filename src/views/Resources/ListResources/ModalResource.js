import React, { useState } from 'react';
import { Modal } from 'antd';

export default ({
	children,
	identity
}) => {
	const [visible, setVisible] = useState(false);
	const _onToogleModal = () => setVisible(!visible)
	return (
		<>
			{
				React.cloneElement(children, {
					onClick: _onToogleModal
				})
			}
			<Modal
				visible={visible}
				onCancel={_onToogleModal}
				title={"Item: " + identity}
				width="80%"
			>
				
			</Modal>
		</>
	)
}