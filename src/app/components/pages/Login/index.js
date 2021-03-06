import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Email from '@material-ui/icons/Email';
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';
import CustomInput from 'components/theme/CustomInput/CustomInput.jsx';
import Button from 'components/theme/CustomButtons/Button.jsx';
import Card from 'components/theme/Card/Card.jsx';
import CardBody from 'components/theme/Card/CardBody.jsx';
import CardHeader from 'components/theme/Card/CardHeader.jsx';
import CardFooter from 'components/theme/Card/CardFooter.jsx';

import loginPageStyle from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx';
import AuthService from 'services/auth.service';
import history from 'providers/history';
import { setUser } from 'store/ducks/auth';
import { useCookies } from 'react-cookie';
// import jwtDecode from 'jwt-decode';

const LoginPage = ({ enqueueSnackbar: snack, classes }) => {
  const [cardAnimation, setAnimation] = useState('cardHidden');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies('jwt');
  useEffect(() => {
    setTimeout(() => setAnimation(''), 700);
  }, []);

  const handleLogin = async () => {
    // tirar usuario do token com decode
    AuthService.Login(email, password).then(res => {
      const { user, token } = res;
      if (user) {
        const domain = process.env.REACT_APP_COOKIE_DOMAIN;
        setCookie('jwt', JSON.stringify(token), { domain });
        dispatch(setUser(user));
        snack(`Usuario autenticado com sucesso!`, {
          variant: 'success',
          autoHideDuration: 1000
        });
        setTimeout(() => history.push('/admin'), 1000);
      }
    });
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login className={classes[cardAnimation]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="primary"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'email',
                    onChange: e => setEmail(e.target.value),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'password',
                    onChange: e => setPassword(e.target.value),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: 'password'
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button
                  color="primary"
                  simple
                  size="lg"
                  block
                  onClick={handleLogin}
                >
                  Entrar
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(withStyles(loginPageStyle)(LoginPage));
