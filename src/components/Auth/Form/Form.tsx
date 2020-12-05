import * as React from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { CommonProps } from '../../../types/CommonProps';

interface Props extends CommonProps {
  title: string | undefined;
  postContent: React.ReactNode | string | undefined;
  error: string | undefined;
}

export const Form: React.FC<Props> = ({ title, children, postContent, error }) => {
  return (
    <div>
      {title && (
        <FormTitle align="center" variant="h3" className="text-center">
          {title}
        </FormTitle>
      )}
      {error && <FormAlert severity="error">{error}</FormAlert>}
      <form>{children}</form>
      {postContent && <PostFormContent>{postContent}</PostFormContent>}
    </div>
  );
};

export const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

export const FormTitle = styled(Typography)`
  margin: 20px;
`;

export const PostFormContent = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const FormAlert = styled(Alert)`
  margin: 20px 0;
`;

export default Form;
