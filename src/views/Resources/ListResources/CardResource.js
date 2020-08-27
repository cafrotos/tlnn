import React from 'react';
import { Card, Row, Typography } from 'antd';
import CarouseResource from 'components/CarouselResource';
import ModalResource from './ModalResource';

export default ({
  data
}) => {
  if (typeof data !== 'object') {
    return null
  }
  return (
    <ModalResource
      identity={data.identity}
    >
      <Card className="card_resource">
        <CarouseResource
          multimedias={data.multimedias}
        />
        <Row justify="center">
          <Typography.Text>
            {data.identity}
          </Typography.Text>
        </Row>
      </Card>
    </ModalResource>
  )
}