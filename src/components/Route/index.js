import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import BaseLayout from 'components/BaseLayout';
import { AppContext } from 'App';
import { LOGIN } from 'configs/routes';

export default ({
  Component,
  ...rest
}) => {
  const context = useContext(AppContext);
  if (!Object.keys(context.user).length && rest.path !== LOGIN) {
    return (
      <Route {...rest}>
        <Redirect to={LOGIN} />
      </Route>
    )
  }
  return (
    <Route {...rest}>
      {
        rest.rules instanceof Array ?
          <BaseLayout {...rest}>
            <Component />
          </BaseLayout> :
          <Component />
      }
    </Route>
  )
}