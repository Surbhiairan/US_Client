import React from 'react';
import { Grid, Typography, TextField, Select, withStyles, OutlinedInput, MenuItem, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
        justifyContent: 'center'
    }
});

const VideoPostSchema = Yup.object().shape({
    link: Yup.string()
            .required("Please provide link"),
    collection: Yup.string()
                    .required("Please select a collection")
})

class VideoPost extends React.Component {

    componentDidMount() {
        this.props.fetchMyCollections(this.props.history)
    }

    onSubmit = (values) => {
        this.props.createPost(values, this.props.history)
    }

    render() {
        const { classes, myCollection, myCollectionLoading } = this.props;
        if (myCollectionLoading) {
            return null
        }
        return (
            <Formik
                initialValues={{
                    title: '',
                    link: '',
                    content: '',
                    tags: '',
                    post_type: 1,
                    collection: ''
                }}
                onSubmit={(values) => this.onSubmit(values) }
                validationSchema={VideoPostSchema}
                render={({ values, handleChange, errors, touched, setFieldValue, handleSubmit }) => (
                    <Grid>
                        <Typography align="center" variant="h5">
                            Video Post
                        </Typography>
                        <GridContainer >
                            <GridItem>
                                <Typography>
                                    Post Title
                            </Typography>
                            </GridItem>
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
                                    value={values.title}
                                />
                                
                            </GridItem>
                        </GridContainer>
                        <GridContainer className={classes.gridContainer}>
                            <Typography>
                                Video URL
                        </Typography>
                            <GridItem xs={12} className={classes.gridItem}>
                                <TextField
                                    id="link"
                                    label="Video URL"
                                    className={classes.textField}
                                    type="text"
                                    name="link"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.link}
                                />
                                {errors.link && touched.link ? (
                                <div style={{ color: "red"}}>{errors.link}</div>
                            ): null}
                            </GridItem>
                        </GridContainer>
                        <GridContainer className={classes.gridContainer}>
                            <Typography>
                                Post Content
                        </Typography>
                            <GridItem xs={12} className={classes.gridItem}>
                                <TextField
                                    id="content"
                                    label="Post Content"
                                    className={classes.textField}
                                    type="text"
                                    name="content"
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    rows={8}
                                    onChange={handleChange}
                                    value={values.content}
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
                                    id="tags"
                                    label="Tags"
                                    className={classes.textField}
                                    type="text"
                                    name="tags"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.tags}
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
                                    value={values.collection}
                                    onChange={handleChange}
                                    input={
                                        <OutlinedInput
                                            label="collection"
                                            labelWidth={50}
                                            name="collection"
                                            id="collection"
                                            style={{ width: '50%' }}
                                        />
                                    }
                                >
                                    {myCollection.map((collection, index) => (
                                        <MenuItem value={collection.id} key={index}>
                                            {collection.title}
                                        </MenuItem>
                                    ))}

                                </Select>
                                {errors.collection && touched.collection ? (
                                <div style={{ color: "red"}}>{errors.collection}</div>
                            ): null}
                            </GridItem>
                        </GridContainer>
                        <GridContainer className={classes.gridContainer}>
                            <Button onClick={handleSubmit} color="primary" variant="contained">
                                Create Post
                            </Button>
                        </GridContainer>

                    </Grid>

                )}
            />
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

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(VideoPost)