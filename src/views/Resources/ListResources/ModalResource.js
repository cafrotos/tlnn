import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import ListResources from '.';
import EditResource from './EditResource';

export default ({
	children,
	data,
	identity,
	disabled
}) => {
	const [visible, setVisible] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const editResourceRef = useRef();

	const _onToogleModal = () => {
		if (disabled) {
			return
		}
		setVisible(!visible)
	};

	const _getListMultimedias = (multimedias) => {
		const _dataSource = []
		multimedias.videos && multimedias.videos.map(video => {
			_dataSource.push({
				multimedias: {
					videos: [video]
				}
			})
		})
		multimedias.audios && multimedias.audios.map(audio => {
			_dataSource.push({
				multimedias: {
					audios: [audio]
				}
			})
		})
		multimedias.images && multimedias.images.map(image => {
			_dataSource.push({
				multimedias: {
					images: [image]
				}
			})
		})
		return _dataSource
	}

	const _onToogleEditResource = () => {
		if (!isEdit) {
			setIsEdit(!isEdit)
			return
		}
		editResourceRef.current.submit()
	}

	return (
		<>
			{
				React.cloneElement(children, {
					children: children.props.children.map((child, index) => React.cloneElement(child, {
						key: index,
						onClick: _onToogleModal
					}))
				})
			}
			<Modal
				visible={visible}
				onCancel={_onToogleModal}
				title={"Item: " + identity}
				width="80%"
				footer={[
					<Button onClick={_onToogleModal} key={0}>
						Cancel
					</Button>,
					<Button type="primary" onClick={_onToogleEditResource} key={1}>
						Edit
					</Button>
				]}
			>
				{
					!isEdit && (
						<ListResources
							dataSource={_getListMultimedias(data.multimedias)}
							disabled={true}
						/>
					)
				}
				{
					isEdit && (
						<EditResource
							intialResource={data}
							ref={editResourceRef}
						/>
					)
				}
			</Modal>
		</>
	)
}