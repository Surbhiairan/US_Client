import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { resetPassword } from '../auth.actions';

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

const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Password should be of 8 characters")
        .max(50, "Too long password")
        .required("required"),
    confirmPassword: Yup.string()
        .test('passwords-match', 'Passwords must match ya fool', function (value) {
            return this.parent.password === value;
        })
        .required('Required'),
    
})


class ResetPassword extends React.Component {
    handleSubmit = (values) => {
        let href = window.location.href;
        let id = href.split('=')[1];
        let value = {
            id: id,
            password: values.password
        }
        resetPassword(value, this.props.history);
    }

    render() {
        const { classes } = this.props;
        return (
            <Formik
                initialValues={{
                    
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={(values) => this.handleSubmit(values)}
                validationSchema={ResetPasswordSchema}
                render={({ values, handleChange, errors, touched, setFieldValue, handleSubmit }) => (
                    <GridContainer className={classes.gridContainer}>
                        <h2>
                            Reset Password
                        </h2>
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
                            {errors.password && touched.password ? (
                                <div style={{ color: "red" }}>{errors.password}</div>
                            ) : null}
                        </GridItem>
                        <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="confirmPassword"
                                label="Confirm Password"
                                className={classes.textField}
                                type="password"
                                name="confirmPassword"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                            ) : null}
                        </GridItem>
                        <GridItem xs={12} className={classes.gridItem}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Reset Password
                            </Button>
                        </GridItem>

                        <Link to={`/login`}>
                            Already have account. Login
                        </Link>
                    </GridContainer>

                )}
            />

        )
    }
}

export default withStyles(styles)(ResetPassword)