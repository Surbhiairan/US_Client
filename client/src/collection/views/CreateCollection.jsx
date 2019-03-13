import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField,Button, Grid } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { compose } from 'redux';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import ImageUpload from '../../components/CustomUpload/ImageUpload';

import { newCollection } from '../collection.action';

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

const CollectionSchema = Yup.object().shape({
    title: Yup.string()
        .required("This field is required"),
    content: Yup.string()
        .required("This field is required"),
})

class CreateCollection extends React.Component {

    handleSubmit = (values) => {
        let id = JSON.parse(localStorage.getItem('user')).data.id;
        values.user = id;
        this.props.newCollection(values, this.props.history);
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid>
                <ImageUpload/>
            
            
            <Formik
                initialValues={{
                    title: '',
                    content: '',
                    header_image_url: 'https://images.pexels.com/photos/1938352/pexels-photo-1938352.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                }}
                onSubmit={(values) => this.handleSubmit(values)}
                validationSchema={CollectionSchema}
                render={({ values, handleChange, errors, touched, setFieldValue, handleSubmit }) => (
                    <GridContainer className={classes.gridContainer}>
                        <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="title"
                                label="Title"
                                className={classes.textField}
                                type="text"
                                name="title"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                            />
                            {errors.title && touched.title ? (
                                <div style={{ color: "red" }}>{errors.title}</div>
                            ) : null}
                        </GridItem>
                        <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="content"
                                label="Content"
                                className={classes.textField}
                                type="text"
                                name="content"
                                autoComplete="content"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                                multiline={true}
                                rows={2}
                                rowsMax={4}
                            />
                            {errors.content && touched.content ? (
                                <div style={{ color: "red" }}>{errors.content}</div>
                            ) : null}
                        </GridItem>
                       
                        <GridItem xs={12} className={classes.gridItem}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Create Collection
                            </Button>
                        </GridItem>
                    </GridContainer>

                )}
            />
            </Grid>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        newCollection: state.collection.newCollection,
        newCollectionLoading: state.collection.newCollectionLoading,
        newCollectionError: state.collection.newCollectionError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newCollection: (values, history) => dispatch(newCollection(values, history))
    }
}

export default compose (withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(CreateCollection)