import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Divider } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { login, facebookLogin, googleLogin } from '../auth.actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  gridItem: {
    textAlign: 'center'
  },
  gridContainer: {
    justifyContent: 'center'
  }
});

const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter correct email format")
    .required("This field is required"),
  password: Yup.string()
    .min(8, "Password should be of min 8 characters")

})

class Login extends React.Component {

  handleSubmit = (values) => {
    let value = {
      email: values.email,
      password: values.password
    }
    //Api call here...
    this.props.login(value, this.props.history)
  }

  onSuccess = (response) => {
    console.log("twitter response", response);
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        console.log(token, "token");
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  render() {
    const { classes } = this.props;
    const responseFacebook = (response) => {
      console.log("facebook login response", response);
      let values = {
        "accessToken": response.accessToken,
        "data_access_expiration_time": response.data_access_expiration_time,
        "email": response.email,
        "expiresIn": response.expiresIn,
        "id": response.id,
        "name": response.name,
        "picture": response.picture,
        "reauthorize_required_in": response.reauthorize_required_in,
        "signedRequest": response.signedRequest,
        "userID": response.userID,
        "source": "fb",
      };
      //call api here
      this.props.facebookLogin(values, this.props.history);
    }

    const responseGoogle = (response) => {
      console.log("google login response", response);
      let values = {
        "El": response.El,
        "Zi": response.Zi,
        "accessToken": response.accessToken,
        "googleId": response.googleId,
        "profileObj": response.profileObj,
        "tokenId": response.tokenId,
        "tokenObj": response.tokenObj,
        "w3": response.w3,
        "email": response.profileObj.email,
        "name": response.profileObj.givenName,
        "source": "gg"
      };
      //call api here
      this.props.googleLogin(values, this.props.history);
    }

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: "true"
        }}
        onSubmit={(values) => this.handleSubmit(values)}
        validationSchema={RegistrationSchema}
        render={({ values, handleChange, errors, touched, setFieldValue, handleSubmit }) => (
          <GridContainer className={classes.gridContainer}>
            <h2>
              Login
                        </h2>
            <GridItem xs={12} className={classes.gridItem}>
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
              />
              {errors.email && touched.email ? (
                <div style={{ color: "red" }}>{errors.email}</div>
              ) : null}
            </GridItem>
            <GridItem xs={12} className={classes.gridItem}>
              <TextField
                id="password"
                label="Password"
                className={classes.textField}
                type="password"
                name="password"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
              />
            </GridItem>
            <GridItem xs={12} className={classes.gridItem} style={{paddingTop: '2%'}}>
              <Link to={`/forgotpassword`}>
                Forgot Password
              </Link>
            </GridItem>
            <GridItem xs={12} className={classes.gridItem} style={{paddingTop: '2%'}}>
              <Button variant="contained" onClick={handleSubmit} color="primary" size="large" >
                Login
              </Button>
            </GridItem>
            <GridItem xs={12} className={classes.gridItem} style={{paddingTop: '2%'}}>
              <Link to={`/register`}>
                Register as new User
              </Link>
            </GridItem>
            <GridItem xs={12} className={classes.gridItem}style={{paddingTop: '1%'}}>
              <Link to={`/admin`} >
                Login as admin
              </Link>
            </GridItem>
            <GridItem xs={12} className={classes.gridItem} style={{paddingTop: '2%'}}>
              <Divider light={false} variant="middle"/>
            </GridItem>
            <GridItem xs={12} className={classes.gridItem} style={{paddingTop: '2%'}}>
              <FacebookLogin
                appId="567482387099295"
                fields="name,email,picture"
                callback={responseFacebook}
              />
            </GridItem>
            
            <GridItem xs={12} className={classes.gridItem} style={{paddingTop: '2%'}}>
            <GoogleLogin
              clientId="321874945921-i48diaqbnoq2be1nlicq6nsbtpf8q2l7.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            </GridItem>
          </GridContainer>


        )}
      />
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    login: (values, history) => dispatch(login(values, history)),
    facebookLogin: (values, history) => dispatch(facebookLogin(values, history)),
    googleLogin: (values, history) => dispatch(googleLogin(values, history))
  }
}

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(Login)