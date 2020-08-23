import React from 'react';
import { Route } from 'react-router-dom';
import BaseLayout from 'components/BaseLayout';

export default ({
  Component,
  ...rest
}) => {
  return (
    <Route {...rest}>
      <BaseLayout {...rest}>
        <Component />
      </BaseLayout>
    </Route>
  )
}