import React, { useEffect, useState } from 'react';
import { Col, Row, Tree, Button, Divider, Space, Spin } from 'antd';
import resourceStructures from 'configs/resourceStructures';
import Title from 'components/Title';
import { useHistory } from 'react-router-dom';
import { CREATE_RESOURCE } from 'configs/routes';
import ListResources from './ListResources';
import firebase from 'utils/firebase'

import './styles.less'
import SearchResource from './SearchResource';

export default () => {
  const history = useHistory()
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [categorySelected, setCategorySelected] = useState("")
  const resourcesCollection = firebase.firestore().collection("resources")

  useEffect(() => {
    _getListResources()
  }, [])

  const _onClickCreateResource = () => history.push(CREATE_RESOURCE)

  const _getListResources = async () => {
    try {
      const resourcesDoc = await resourcesCollection
        .get();
      setResources(resourcesDoc.docs.map(resource => ({
        id: resource.id,
        ...resource.data()
      })))
    } catch (error) {
      console.log(error)
    }
  }

  const _searchResourceByKeywords = async (keywords = []) => {
    try {
      setLoading(true)
      const resourcesDoc = await resourcesCollection
        .where("keywords", "array-contains-any", keywords)
        .get();
      setResources(resourcesDoc.docs.map(resource => ({
        id: resource.id,
        ...resource.data()
      })))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const _getListResourceByCategory = async (category) => {
    try {
      setLoading(true)
      const resourcesDoc = await resourcesCollection
        .where("category", "==", category)
        .get();
      setResources(resourcesDoc.docs.map(resource => ({
        id: resource.id,
        ...resource.data()
      })))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const _onSeleceCategory = (value) => {
    if (!value.length) {
      _getListResources()
      return
    }
    setCategorySelected(value[0])
    _getListResourceByCategory(value[0])
  }

  return (
    <>
      <Title
        title="Resource"
        right={[
          <Button
            size="small"
            type="primary"
            onClick={_onClickCreateResource}
          >
            Create Resource
          </Button>
        ]}
      />
      <Row className="view_resource">
        <Col span={5}>
          <Tree
            selectedKeys={[categorySelected]}
            treeData={resourceStructures}
            onSelect={_onSeleceCategory}
          />
        </Col>
        <Divider type="vertical" className="vertical_divider" />
        <Col className="list_resource">
          <Space
            direction="vertical"
            size="large"
            style={{
              width: "100%"
            }}
          >
            <SearchResource
              onSearch={_searchResourceByKeywords}
            />
            <Spin
              spinning={loading}
            >
              <ListResources
                dataSource={resources}
              />
            </Spin>
          </Space>
        </Col>
      </Row>
    </>
  )
}