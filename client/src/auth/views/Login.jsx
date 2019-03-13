import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import TwitterLogin from 'react-twitter-auth';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
        //Api call here...
        this.props.login(values, this.props.history)
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
        console.log("facebook login response",response);
        let values = {
            "email":response.email,
	        "name":response.name,
	        "fid":response.id,
	        "profile_image_url":response.picture.data.url,
	        "accessToken":response.accessToken,
        };
        //call api here
        this.props.facebookLogin(values, this.props.history);
    }
      
    const responseGoogle = (response) => {
      console.log("google login response",response);
      let values = {
        "email":response.profileObj.email,
        "name":response.profileObj.givenName,
        "gid":response.googleId,
        "profile_image_url":response.profileObj.imageUrl,
        "accessToken":response.accessToken,
        "idToken":response.tokenId,
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
                    render={({values, handleChange, errors, touched, setFieldValue, handleSubmit}) => (
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
                                <div style={{ color: "red"}}>{errors.email}</div>
                            ): null}
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
                        <GridItem xs={12} className={classes.gridItem}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="remenberMe"
                                        checked={values.rememberMe}
                                        onChange={handleChange}
                                        value={values.rememberMe}
                                    />
                                }
                                label="Remember Me"
                            />
                        </GridItem>
                        <Button variant="contained" onClick={handleSubmit}>
                                Login
                        </Button>

                        <FacebookLogin
                          appId="567482387099295"
                          fields="name,email,picture"
                          callback={responseFacebook} 
                        />
                        
                        <GoogleLogin
                          clientId="321874945921-i48diaqbnoq2be1nlicq6nsbtpf8q2l7.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                          buttonText="LOGIN WITH GOOGLE"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                        />

                        <TwitterLogin
                          loginUrl="http://localhost:3000"
                          onFailure={this.onFailed}
                          onSuccess={this.onSuccess}
                          requestTokenUrl="http://localhost:3000"
                        />

                    </GridContainer>
                    
                )}
                />
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (values, history) => dispatch(login(values, history)),
        facebookLogin: (values, history) => dispatch(facebookLogin(values, history)),
        googleLogin: (values, history) => dispatch(googleLogin(values, history))
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps)) (Login)