import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { register } from '../auth.actions';

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
    first_name: Yup.string()
        .required("This field is required"),
    email: Yup.string()
        .email("Please enter correct email format")
        .required("This field is required"),
    password: Yup.string()
        .min(8, "Password should be of min 8 characters")
        .required("This field is required")

})

class Registration extends React.Component {

    handleSubmit = (values) => {
        let value = {
            email: values.email,
            password: values.password,
            role: 'user',
            first_name: values.first_name
        }
        this.props.register(value, this.props.history);
    }

    render() {
        const { classes } = this.props;
        return (
            <Formik
                initialValues={{
                    first_name: '',
                    email: '',
                    password: '',
                    role: 'user'
                   // tnc: true
                }}
                onSubmit={(values) => this.handleSubmit(values)}
                validationSchema={RegistrationSchema}
                render={({ values, handleChange, errors, touched, setFieldValue, handleSubmit }) => (
                    <GridContainer className={classes.gridContainer}>
                        <h2>
                            Registration
                        </h2>
                        <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="first_name"
                                label="Name"
                                className={classes.textField}
                                type="text"
                                name="first_name"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                            />
                            {errors.first_name && touched.first_name ? (
                                <div style={{ color: "red" }}>{errors.first_name}</div>
                            ) : null}
                        </GridItem>
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
                            {errors.password && touched.password ? (
                                <div style={{ color: "red" }}>{errors.password}</div>
                            ) : null}
                        </GridItem>
                        <GridItem xs={12} className={classes.gridItem}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="tnc"
                                        checked={values.tnc}
                                        onChange={handleChange}
                                        value={values.tnc}
                                    />
                                }
                                label="I agree to terms and conditions."
                            />
                        </GridItem>
                        <GridItem xs={12} className={classes.gridItem}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Register with Post Curve
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

const mapDispatchToProps = (dispatch) => {
    return {
        register: (values, history) => dispatch(register(values, history))
    }
}

export default compose (withStyles(styles), connect(null, mapDispatchToProps))(Registration)