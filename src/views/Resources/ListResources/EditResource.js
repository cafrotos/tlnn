import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { notification } from 'antd';
import ResourceForm from 'components/ResourceForm';
import { updateResource } from 'utils/firebase';

export default forwardRef(({
  intialResource
}, ref) => {
  const resourceRef = useRef();

  useImperativeHandle(ref, () => ({
    submit: _onSubmit
  }))

  const _onSubmit = async () => {
    if (!resourceRef.current || !resourceRef.current.form) {
      return
    }

    try {
      await resourceRef.current.form.validateFields()
    } catch (error) {
      return
    }

    const resource = resourceRef.current.form.getFieldsValue();

    try {
      await updateResource(resource, intialResource.id)
      notification.success({
        message: "Success"
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message
      })
    }
  }

  return (
    <div className="create_resource">
      <ResourceForm
        ref={resourceRef}
        className="resource_form"
        initialValues={intialResource}
      />
    </div>
  )
})