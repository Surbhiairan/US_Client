import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
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
    collection_title: Yup.string()
        .required("This field is required"),
    collection_text: Yup.string()
        .required("This field is required"),
})

class EditCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: null

        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getCollectionDetail(id, this.props.history);
        // this.props.getCollectionDetail(id, this.props.history);
        // this.props.getPostsList(id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ imagePreviewUrl: nextProps.collectionDetail.collectionImage })
    }

    handleSubmit = (values) => {
        let userId = JSON.parse(localStorage.getItem('user')).id;
        const { id } = this.props.match.params;
        values.id = id;
        values.user = userId;
        values.collection_image = this.state.imagePreviewUrl
        this.props.editCollection(values, this.props.history);
    }

    handleDeleteCollection = () => {
        const { id } = this.props.match.params;
        console.log(id, "ksldkjvksdv");
        this.props.deleteCollection(id, this.props.history)
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
        const {
            classes,
            collectionDetail,
            collectionDetailLoading,
            newCollectionLoading
        } = this.props;

        console.log(collectionDetail, "cjjlkadj");
        if (collectionDetailLoading || newCollectionLoading) {
            return (
                <CircularProgress className={classes.progress} />
            )
        }
        else {
            return (
                <Grid>
                    <ImageUpload
                        handleImageChange={this.handleImageChange}
                        imagePreviewUrl={this.state.imagePreviewUrl}
                    />
                    <Formik
                        initialValues={{
                            collection_title: collectionDetail.collectionTitle,
                            collection_text: collectionDetail.collectionText,
                        }}
                        onSubmit={(values) => this.handleSubmit(values)}
                        validationSchema={CollectionSchema}
                        render={({ values, handleChange, errors, touched, handleSubmit }) => (
                            <GridContainer className={classes.gridContainer}>

                                <GridItem xs={12} className={classes.gridItem}>
                                    <TextField
                                        id="collection_title"
                                        className={classes.textField}
                                        type="text"
                                        name="collection_title"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={values.collection_title}
                                    />
                                    {errors.collection_title && touched.collection_title ? (
                                        <div style={{ color: "red" }}>{errors.collection_title}</div>
                                    ) : null}
                                </GridItem>
                                <GridItem xs={12} className={classes.gridItem}>
                                    <TextField
                                        id="collection_text"
                                        className={classes.textField}
                                        type="text"
                                        name="collection_text"
                                        autoComplete="content"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={handleChange}
                                        multiline={true}
                                        rows={2}
                                        rowsMax={4}
                                        value={values.collection_text}
                                    />
                                    {errors.collection_text && touched.collection_text ? (
                                        <div style={{ color: "red" }}>{errors.collection_text}</div>
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
                </Grid>

            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        collectionDetail: state.collection.collectionDetail,
        collectionDetailLoading: state.collection.collectionDetailLoading,
        collectionDetailError: state.collection.collectionDetailError,

        newCollectionLoading: state.collection.newCollectionLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCollectionDetail: (id, history) => dispatch(getCollectionDetail(id, history)),
        editCollection: (values, history) => dispatch(editCollection(values, history)),
        deleteCollection: (id, history) => dispatch(deleteCollection(id, history))
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(EditCollection)