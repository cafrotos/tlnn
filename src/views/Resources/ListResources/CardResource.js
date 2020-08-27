import React from 'react';
import { Card, Row, Typography } from 'antd';
import CarouseResource from 'components/CarouselResource';

export default ({
  data
}) => {
  if (typeof data !== 'object') {
    return null
  }
  return (
    <Card className="card_resource">
      <CarouseResource
        multimedias={data.multimedias}
      />
      <Row justify="center">
        <Typography.Text>
          {data.identify}
        </Typography.Text>
      </Row>
    </Card>
  )
}