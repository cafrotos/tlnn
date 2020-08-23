import React, { useState } from 'react';
import { Col, Row, Tree } from 'antd';
import resourceStructures from 'configs/resourceStructures';
import Title from 'components/Title';

export default () => {
  return (
    <Row className="resource_page">
      <Title 
        title=""
      />
      <Col span={6}>
        <Tree
          treeData={resourceStructures}
        />
      </Col>
      <Col span={18}>

      </Col>
    </Row>
  )
}