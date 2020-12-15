import React, { useState } from 'react';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className={styles.container}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <h1 className={styles.formHeader}>
          Chatify
          <span>.io</span>
        </h1>
        <Form size="large" className={styles.form}>
          <Segment>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Email Adresi"
              type="email"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Şifre"
              type="password"
            />

            <Button color="purple" fluid size="large">
              Giriş Yap
            </Button>
          </Segment>
        </Form>
        <Message>
          Yeni misin? <Link to="/signup">Hesap Oluştur</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
