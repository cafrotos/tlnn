import React from 'react';
import { Row, Typography, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons'

import './index.less'
import { useHistory } from 'react-router-dom';
import { HOME } from 'configs/routes';

export default () => {
  const history = useHistory();

  const _goHome = () => history.push(HOME)

  return (
    <Row
      className="not_found"
      align="middle"
      justify="center"
    >
      <Typography.Title
        className="title"
      >
        404
      </Typography.Title>
      <Typography.Text
        className="description"
      >
        Not Found
      </Typography.Text>
      <Button
        type="primary"
        icon={<LeftOutlined />}
        onClick={_goHome}
      >
        Go to Home
      </Button>
    </Row>
  )
}