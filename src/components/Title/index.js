import React from 'react'
import { Row, Button, Typography, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import './index.less'
import { useHistory } from 'react-router-dom'

/**
 * @param {Object} props
 * @param {Boolean} props.backable
 * @param {Function} props.onBack
 * @param {Array<import('react').ReactNode>} props.right List React Node
 * @param {String} props.title
 */
export default ({
  backable,
  onBack,
  right,
  title
}) => {
  const history = useHistory();

  return (
    <Row justify="space-between" className="title">
      <Row justify="start">
        {
          backable && (
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={onBack || history.goBack}
            />
          )
        }
        <Typography.Title level={4}>
          {title}
        </Typography.Title>
      </Row>
      <Space>
        {React.Children.map(right, (component, index) => React.cloneElement(component, { key: index }))}
      </Space>
    </Row>
  )
}