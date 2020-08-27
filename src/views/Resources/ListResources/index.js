import React from 'react';
import { Row, Col } from 'antd';
import CardResource from './CardResource';
import _ from 'lodash'

export default ({
  dataSource
}) => {
  const dataSourceColumns = dataSource instanceof Array ? _.chunk(dataSource, Math.ceil(dataSource.length / 4)) : [[], [], [], []]
  return (
    <Row gutter={[16, 16]}>
      {
        dataSourceColumns.map((column, columnIndex) => (
          <Col span={6} key={columnIndex}>
            {
              column instanceof Array && column.map((cell, cellIndex) => (
                <CardResource
                  key={cellIndex}
                  data={cell}
                />
              ))
            }
          </Col>
        ))
      }
    </Row>
  )
}