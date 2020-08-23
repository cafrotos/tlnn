import React, { useRef, useState } from 'react';
import { Row, Button, notification, Upload } from 'antd';
import ResourceForm from 'components/ResourceForm';
import Title from 'components/Title';
import { createResource } from 'utils/firebase';

import './index.less'
import { getWorkbookFromBlob } from 'utils';

export default () => {
  const [loading, setLoading] = useState(false)
  const [bulkCreateLoading] = useState(false)
  const resourceRef = useRef();

  const _onSubmit = async () => {
    if (!resourceRef.current || !resourceRef.current.form) {
      return
    }

    try {
      await resourceRef.current.form.validateFields()
    } catch (error) {
      return
    }

    setLoading(true)
    const resource = resourceRef.current.form.getFieldsValue();

    try {
      await createResource(resource)
      notification.success({
        message: "Success"
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message
      })
    }

    setLoading(false)
  }

  const _readFileExcel = async ({ file }) => {
    const workbook = await getWorkbookFromBlob(file)
    console.log(workbook)
  }

  return (
    <div className="create_resource">
      <Title
        backable={true}
        right={[
          <Upload
            accept=".xlsx"
            fileList={[]}
            customRequest={_readFileExcel}
          >
            <Button
              size="small"
              type="primary"
              loading={bulkCreateLoading}
              disabled={bulkCreateLoading}
            >
              Upload Excel
            </Button>
          </Upload>
        ]}
        title="Create Resource"
      />
      <ResourceForm
        ref={resourceRef}
        className="resource_form"
      />
      <Row justify="center">
        <Button
          type="primary"
          loading={loading}
          onClick={_onSubmit}
        >
          Submit
        </Button>
      </Row>
    </div>
  )
}