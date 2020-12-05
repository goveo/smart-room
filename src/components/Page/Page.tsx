import React, { useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';
import { CommonProps } from '../../types/CommonProps';

export const Page: React.FC<CommonProps> = ({ children, ...restProps }) => {
  const authContext = useContext(AuthContext);
  const { loading } = authContext;

  return <Root {...restProps}>{!loading && children}</Root>;
};

const Root = styled.div`
  margin-top: 20px;
`;

export default Page;
