import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { CommonProps } from '../../types/CommonProps';

const Page: React.FC<CommonProps> = ({ children, ...restProps }) => {
  const authContext = useContext(AuthContext);
  const { loading } = authContext;

  return <div {...restProps}>{!loading && children}</div>;
};

export default Page;
