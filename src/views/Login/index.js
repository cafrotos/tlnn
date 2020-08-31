import React, { useContext } from 'react';
import { Row, Button, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import firebase from 'utils/firebase'
import { AppContext } from 'App';
import { useHistory } from 'react-router-dom';
import { RESOURCE } from 'configs/routes';

export default () => {
  const context = useContext(AppContext);
  const history = useHistory()

  const onGoogleSignin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await firebase.auth().signInWithPopup(provider);
    context.setUser(user)
    history.push(RESOURCE)
  }

  return (
    <>
      <Row justify="center" style={{ padding: 64 }}>
        <Typography.Title>
          Trị liệu ngôn ngữ
      </Typography.Title>
      </Row>
      <Row justify="center" style={{ padding: 16 }}>
        <Button
          type="primary"
          onClick={onGoogleSignin}
        >
          <GoogleOutlined />
          Login with Google
        </Button>
      </Row>
    </>
  )
}