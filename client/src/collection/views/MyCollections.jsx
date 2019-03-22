import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom'

import CollectionsList from './CollectionsList';
import { fetchMyCollections } from '../collection.action';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});
class MyCollection extends React.Component {

    componentDidMount() {
        this.props.fetchMyCollections(this.props.history);
    }

    handleCreateCollection = () => {
        console.log("redirect to create new collection page");
        this.props.history.push('/createCollection');
    }

    render() {
        const { 
            classes,
            myCollection,
            myCollectionLoading,
            myCollectionError
        } = this.props;

            return (
            <div>
                <Button variant="contained" className={classes.button} onClick={this.handleCreateCollection}>
                    Create New Collection
                </Button>
                {myCollectionLoading ? <CircularProgress className={classes.progress} />: null}
                {myCollection ? 
                <CollectionsList 
                    collections = {myCollection}
                    history = {this.props.history}
                /> : null}
                {myCollectionError ? <div>Refresh</div>:null}
            </div>
            )
    }
}
  
const mapStateToProps = (state) => {
    return {
        myCollection: state.collection.myCollection,
        myCollectionLoading: state.collection.myCollectionLoading,
        myCollectionError: state.collection.myCollectionError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMyCollections: (history) => dispatch(fetchMyCollections(history)),
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps)) (MyCollection);