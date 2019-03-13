import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Checkbox, FormControlLabel, Button, Grid } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import ImageUpload from '../../components/CustomUpload/ImageUpload';

import { editCollection, getCollectionDetail, deleteCollection } from '../collection.action';

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

class EditCollection extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getCollectionDetail(id, this.props.history);
        // this.props.getCollectionDetail(id, this.props.history);
        // this.props.getPostsList(id, this.props.history);
    }

    handleSubmit = (values) => {
        let id = JSON.parse(localStorage.getItem('user')).data.id;
        values.user = id;
        this.props.editCollection(values, this.props.history);
    }

    handleDeleteCollection = () => {
        const { id } = this.props.match.params;
        console.log(id, "ksldkjvksdv");
        this.props.deleteCollection(id, this.props.history)
    }

    render() {
        const { 
            classes,
            collectionDetail,
            collectionDetailLoading,
            collectionDetailError,
        } = this.props;

        console.log(collectionDetail,"cjjlkadj");
        if(collectionDetailLoading) {
            return(
                <CircularProgress className={classes.progress} />
            )
        }
        else {
            return (
                <Formik
                    initialValues={{
                    title: collectionDetail.title,
                    content: collectionDetail.content,
                    header_image_url: 'https://images.pexels.com/photos/1938352/pexels-photo-1938352.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                }}
                onSubmit={(values) => this.handleSubmit(values)}
                validationSchema={CollectionSchema}
                render={({ values, handleChange, errors, touched, setFieldValue, handleSubmit }) => (
                    <GridContainer className={classes.gridContainer}>
                        <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="title"
                                className={classes.textField}
                                type="text"
                                name="title"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.title}
                            />
                            {errors.title && touched.title ? (
                                <div style={{ color: "red" }}>{errors.title}</div>
                            ) : null}
                        </GridItem>
                        <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="content"
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
                                value={values.content}
                            />
                            {errors.content && touched.content ? (
                                <div style={{ color: "red" }}>{errors.content}</div>
                            ) : null}
                        </GridItem>
                       
                        <GridItem xs={12} className={classes.gridItem}>
                            <Button variant="contained" onClick={this.handleDeleteCollection}>
                                Delete Collection
                            </Button>
                            <Button variant="contained" onClick={handleSubmit}>
                                Save Collection
                            </Button>
                        </GridItem>
                    </GridContainer>

                    )}
                />

            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        collectionDetail: state.collection.collectionDetail,
        collectionDetailLoading: state.collection.collectionDetailLoading,
        collectionDetailError: state.collection.collectionDetailError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCollectionDetail: (id, history) => dispatch(getCollectionDetail(id, history)),
        editCollection: (values, history) => dispatch(editCollection(values, history)),
        deleteCollection: (id, history) => dispatch(deleteCollection(id, history))
    }
}

export default compose (withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(EditCollection)