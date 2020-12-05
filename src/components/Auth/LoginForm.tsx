import React, { useState, useCallback, useMemo, useContext } from 'react';
import { CommonProps } from '../../types/CommonProps';
import AuthContext from '../../context/auth/authContext';
import { Form, Input, SubmitButton } from './Form';

interface Props extends CommonProps {
  onSubmit: (user: { username: string; password: string }) => void;
  postContent?: React.ReactNode;
}

export const LoginForm: React.FC<Props> = ({ onSubmit, postContent }) => {
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({
    username: '',
    password: '',
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
    const { username, password } = user;
    return username && password;
  }, [user]);

  return (
    <Form title="Login" postContent={postContent} error={authContext.error as string}>
      <Input name="username" label="Username" value={user.username} onChange={onChange} />
      <Input name="password" type="password" label="Password" value={user.password} onChange={onChange} />
      <SubmitButton variant="outlined" onClick={onSubmitClick} color="primary" disabled={!isFilled}>
        Login
      </SubmitButton>
    </Form>
  );
};

export default LoginForm;
