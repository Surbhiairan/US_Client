import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { compose } from 'redux';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { login, facebookLogin, googleLogin } from '../../auth/auth.actions';

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

class AdminLogin extends React.Component {

    handleSubmit = (values) => {
        //Api call here...
        this.props.login(values, this.props.history);
        //this.props.history.push('/admin/users');
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
                        <Button variant="contained" onClick={handleSubmit} color="primary">
                                Login
                        </Button>

                        

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

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps)) (AdminLogin)