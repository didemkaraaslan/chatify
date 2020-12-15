import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './signup.module.css';

const SignUp = () => {
  const firebase = useFirebase();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then((createdUser) => {
      //     console.log(createdUser);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
  };

  const isFormValid = () => {
    let errors = [];
    let error = {};

    if (!isFormFilled()) {
      error = { message: 'Tüm boşlukları doldurun ' };
      setErrors(errors.concat(error));
      return false;
    } else if (!isPasswordsMatch()) {
      error = { message: 'Şifre, Şifre (Tekrar) aynı olmalıdır' };
      setErrors(errors.concat(error));
      return false;
    }
    return true;
  };

  const isFormFilled = () =>
    [username, email, password, passwordConfirm].every((field) =>
      Boolean(field)
    );

  const isPasswordsMatch = () => password === passwordConfirm;

  console.log(errors);

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
        <Form size="large" className={styles.form} onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı Adı"
              type="text"
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Email Adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Şifre (Tekrar)"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
            />

            <Button color="purple" fluid size="large">
              Giriş Yap
            </Button>
          </Segment>
        </Form>
        <Message>
          Zaten bir hesabın var mı? <Link to="/login">Giriş Yap</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
