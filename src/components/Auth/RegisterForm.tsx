import React, { useState, useCallback, useMemo, useContext } from 'react';
import { CommonProps } from '../../types/CommonProps';
import AuthContext from '../../context/auth/authContext';
import { Form, Input, SubmitButton } from './Form';

interface Props extends CommonProps {
  onSubmit: (user: { username: string; password: string }) => void;
  postContent?: React.ReactNode;
}

export const RegisterForm: React.FC<Props> = ({ onSubmit, postContent }) => {
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({
    username: '',
    password: '',
    password2: '',
  });

  const onChange = useCallback(
    (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    },
    [user],
  );

  const onSubmitClick = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(user);
    },
    [onSubmit, user],
  );

  const isFilled = useMemo(() => {
    const { username, password, password2 } = user;
    return username && password && password === password2;
  }, [user]);

  return (
    <Form title="Sign up" postContent={postContent} error={authContext.error as string}>
      <Input name="username" label="Username" value={user.username} onChange={onChange} />
      <Input name="password" type="password" label="Password" value={user.password} onChange={onChange} />
      <Input
        name="password2"
        type="password"
        label="Confirm password"
        value={user.password2}
        onChange={onChange}
        helperText={!!user.password2 && user.password !== user.password2 && 'Password mismatch'}
        error={!!user.password2 && user.password !== user.password2}
      />
      <SubmitButton variant="outlined" onClick={onSubmitClick} color="primary" disabled={!isFilled}>
        Sign up
      </SubmitButton>
    </Form>
  );
};

export default RegisterForm;
