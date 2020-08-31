import React, { useState, useEffect } from 'react';
import { Card, Row, Typography } from 'antd';
import CarouseResource from 'components/CarouselResource';
import ModalResource from './ModalResource';

export default ({
  data,
  disabled
}) => {
  if (typeof data !== 'object') {
    return null
  }

  return (
    <ModalResource
      identity={data.identity}
      data={data}
      disabled={disabled}
    >
      <Card className="card_resource">
        <CarouseResource
          multimedias={data.multimedias}
        />
        <Row justify="center">
          <Typography.Text className="text_cursor">
            {data.identity}
          </Typography.Text>
        </Row>
      </Card>
    </ModalResource>
  )
}