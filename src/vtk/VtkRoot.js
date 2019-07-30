import React from 'react';
import { Row, Col } from 'antd'
import View from './View'
import Panel from './Panel'

export default function App() {
  return (
    <Row>
      <Col span={18}>
        <View />
      </Col>
      <Col span={6}>
        <Panel />
      </Col>
    </Row>
  )
}
