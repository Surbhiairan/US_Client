import React from 'react';
import {  Grid, Typography, TextField, Select, withStyles, OutlinedInput, MenuItem, Button  } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImageUpload from '../../components/CustomUpload/ImageUpload';
import defaultImage from "../../assets/img/default-image.png";

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { fetchMyCollections } from '../../collection/collection.action';
import { createPost } from '../post.action';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '50%'
    },
    gridItem: {
        textAlign: 'center'
    },
    gridContainer: {
        justifyContent: 'center',
        textAlign: 'center'
    }
});

const ImagePostSchema = Yup.object().shape({
    
    collection_id: Yup.string()
                    .required("Please select a collection")
})


class ImagePost extends React.Component {

    state = {
        file:null,
        imagePreviewUrl: defaultImage
    }

    componentDidMount() {
        this.props.fetchMyCollections(this.props.history)
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

    onSubmit = (values) => {
        values.post_img = this.state.imagePreviewUrl;
        this.props.createPost(values, this.props.history)
    }


    render() {
        const { classes, myCollection, myCollectionLoading } = this.props;
        if (myCollectionLoading) {
            return null;
        }
        else if (myCollection.length === 0) {
            return (
                <Typography align="center" variant="h4">
                    Please create collection first.
                </Typography>
            )
        }
        return (
            <Grid>
                <Typography align="center" variant="h5">
                            Image Post
                        </Typography>
                <ImageUpload
                    handleImageChange = {this.handleImageChange}
                    imagePreviewUrl= {this.state.imagePreviewUrl}
                />
            
            <Formik
                initialValues={{
                    post_title: '',
                    post_text: '',
                    post_tags: '',
                    post_type: 1,
                    collection_id: ''
                }}
                onSubmit={(values) => this.onSubmit(values) }
                validationSchema={ImagePostSchema}
                render={({ values, handleChange, errors, touched, setFieldValue, handleSubmit }) => (
                    <Grid>
                        
                        <GridContainer className={classes.gridContainer}>
                            <GridItem>
                                <Typography>
                                    Post Title
                                </Typography>
                            </GridItem>
                            <GridItem xs={12} className={classes.gridItem}>
                                <TextField
                                    id="post_title"
                                    label="Title"
                                    className={classes.textField}
                                    type="text"
                                    name="post_title"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.post_title}
                                />
                                
                            </GridItem>
                        </GridContainer>
                        
                        <GridContainer className={classes.gridContainer}>
                            <Typography>
                                Post Content
                        </Typography>
                            <GridItem xs={12} className={classes.gridItem}>
                                <TextField
                                    id="post_text"
                                    label="Post Content"
                                    className={classes.textField}
                                    type="text"
                                    name="post_text"
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    rows={8}
                                    onChange={handleChange}
                                    value={values.post_text}
                                >
                                </TextField>
                            </GridItem>
                        </GridContainer>
                        <GridContainer className={classes.gridContainer}>
                            <Typography>
                                Post Tags
                        </Typography>
                            <GridItem xs={12} className={classes.gridItem}>
                                <TextField
                                    id="post_tags"
                                    label="Tags"
                                    className={classes.textField}
                                    type="post_tags"
                                    name="post_tags"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.post_tags}
                                >
                                </TextField>
                            </GridItem>
                        </GridContainer>
                        <GridContainer className={classes.gridContainer}>
                            <Typography>
                                Collection
                        </Typography>
                            <GridItem xs={12} className={classes.gridItem}>
                                <Select
                                    label="collection"
                                    value={values.collection_id}
                                    onChange={handleChange}
                                    input={
                                        <OutlinedInput
                                            label="collection"
                                            labelWidth={50}
                                            name="collection_id"
                                            id="collection_id"
                                            style={{ width: '50%' }}
                                        />
                                    }
                                >
                                    {myCollection.map((collection, index) => (
                                        <MenuItem value={collection.id} key={index}>
                                            {collection.collectionTitle}
                                        </MenuItem>
                                    ))}

                                </Select>
                                {errors.collection_id && touched.collection_id ? (
                                <div style={{ color: "red"}}>{errors.collection_id}</div>
                            ): null}
                            </GridItem>
                        </GridContainer>
                        <GridContainer className={classes.gridContainer}>
                            <Button  onClick={handleSubmit} color="primary" variant="contained">
                                Create Post
                            </Button>
                        </GridContainer>

                    </Grid>

                )}
            />
            </Grid>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        myCollection: state.collection.myCollection,
        myCollectionError: state.collection.myCollectionError,
        myCollectionLoading: state.collection.myCollectionLoading
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMyCollections: (history) => dispatch(fetchMyCollections(history)),
        createPost: (values, history) => dispatch(createPost(values, history))
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(ImagePost)
