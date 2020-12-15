import React, { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

import styles from './signup.module.css';

const SignUp = () => {
  const firebase = useFirebase();
  const [fbErrors, setFbErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const { register, errors, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register({ name: 'username' }, { required: true });
    register({ name: 'email' }, { required: true });
    register({ name: 'password' }, { required: true, minLength: 6 });
  }, []);

  const onSubmit = ({ username, email, password, passwordConfirm }, e) => {
    setSubmitting(true);
    setFbErrors([]);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        console.log(createdUser);
        setSubmitting(false);
      })
      .catch((error) => {
        setFbErrors([{ message: error.message }]);
        setSubmitting(false);
      });
  };

  const displayErrors = () =>
    fbErrors.map((error, index) => <p key={index}>{error.message}</p>);

  console.log(fbErrors);

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
        <Form
          size="large"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              name="username"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.username ? true : false}
              placeholder="Kullanıcı Adı"
              type="text"
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Email Adresi"
              name="email"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.email ? true : false}
              type="email"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Şifre"
              name="password"
              onChange={(e, { name, value }) => {
                setValue(name, value);
              }}
              error={errors.password ? true : false}
              type="password"
            />

            <Button color="purple" fluid size="large" disabled={submitting}>
              Giriş Yap
            </Button>
          </Segment>
        </Form>
        {fbErrors.length > 0 && <Message error> {displayErrors()}</Message>}
        <Message>
          Zaten bir hesabın var mı? <Link to="/login">Giriş Yap</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
