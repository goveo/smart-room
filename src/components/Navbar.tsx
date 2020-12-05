import React, { useContext, useCallback } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { ExitToApp as ExitIcon } from '@material-ui/icons';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AuthContext from '../context/auth/authContext';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated } = authContext;

  const onLogoutClick = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <AppBar position="sticky" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography color="inherit" variant="h6" component="h1">
          Smart Room
        </Typography>
        <div className={classes.grow} />
        {isAuthenticated && (
          <IconButton edge="end" color="inherit" onClick={onLogoutClick}>
            <ExitIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
