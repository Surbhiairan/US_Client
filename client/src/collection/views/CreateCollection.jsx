import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField,Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { compose } from 'redux';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import ImageUpload from '../../components/CustomUpload/ImageUpload';
import defaultImage from "../../assets/img/default-image.png";

import { newCollection } from '../collection.action';

const styles = theme => ({
    textField: {
        width: '100%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    gridItem: {
        //textAlign: 'center'
    },
    gridContainer: {
        //justifyContent: 'center'
        paddingLeft: '20%',
        paddingRight: '20%'
    }
});

const CollectionSchema = Yup.object().shape({
    collection_title: Yup.string()
        .required("This field is required"),
    collection_text: Yup.string()
        .required("This field is required"),
})

class CreateCollection extends React.Component {
    state = {
        file:null,
        imagePreviewUrl: defaultImage
    }

    handleSubmit = (values) => {
        let id = JSON.parse(localStorage.getItem('user')).id;
        values.user_id = id;
        values.collection_image = this.state.imagePreviewUrl
        console.log("state", this.state)
        this.props.newCollection(values, this.props.history);
    }

    handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        };
        reader.readAsDataURL(file);
      }

    render() {
        const { classes, newCollectionLoading } = this.props;
        if (newCollectionLoading) {
            return (
                <CircularProgress className={classes.progress} />
            )
        }
        return (
            <Grid>
                <ImageUpload
                    handleImageChange = {this.handleImageChange}
                    imagePreviewUrl= {this.state.imagePreviewUrl}
                />
            
            <Formik
                initialValues={{
                    collection_title: '',
                    collection_text: '',
                    //header_image_url: 'https://images.pexels.com/photos/1938352/pexels-photo-1938352.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                }}
                onSubmit={(values) => this.handleSubmit(values)}
                validationSchema={CollectionSchema}
                render={({ values, handleChange, errors, touched, setFieldValue, handleSubmit }) => (
                    <GridContainer className={classes.gridContainer}>
                        <Typography> Collection Title</Typography>
                        <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="collection_title"
                                label="Title"
                                className={classes.textField}
                                type="text"
                                name="collection_title"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                            />
                            {errors.collection_title && touched.collection_title ? (
                                <div style={{ color: "red" }}>{errors.collection_title}</div>
                            ) : null}
                        </GridItem>
                        <Typography style={{ paddingTop: '2%'}}> Collection Description </Typography>
                        <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="collection_text"
                                label="Content"
                                className={classes.textField}
                                type="text"
                                name="collection_text"
                                autoComplete="collection_text"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                                multiline={true}
                                rows={5}
                            />
                            {errors.collection_text && touched.collection_text ? (
                                <div style={{ color: "red" }}>{errors.collection_text}</div>
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