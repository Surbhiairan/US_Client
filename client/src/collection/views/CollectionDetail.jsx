import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import PostsList from '../views/PostsList';
import { getCollectionDetail, getPostsList } from '../collection.action';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    grid: {
        padding: '5%'
    }
});
class CollectionDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id, "id");
        this.props.getCollectionDetail(id, this.props.history);
        this.props.getPostsList(id, this.props.history);
    }

    createPost = () => {
        this.props.history.push('/createPost')
    }

    editCollection = (id) => {
        this.props.history.push('/editCollection/'+ id)
    }

    render() {
        const {
            classes,
            collectionDetail,
            collectionDetailLoading,
            collectionDetailError,

            posts,
            postsLoading,
            // postsError,

        } = this.props;

        return (

            <div className={classes.root}>
                {collectionDetailLoading ? <CircularProgress className={classes.progress} /> : null}

                {collectionDetail ?

                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <img
                                alt=''
                                style={{ width: "100%", height: "200px", }}
                                src={collectionDetail.collectionImage} />
                        </Grid>

                        <Grid item xs={3} style={{paddingLeft: '2%', paddingRight: '2%'}}>
                            <h2 style={{textTransform: 'capitalize'}}>{collectionDetail.collectionTitle}</h2>
                            <p>{collectionDetail.collectionText}</p>
                        </Grid>
                        <Grid item xs={6}>
                                <Button variant="contained" className={classes.button} onClick={this.createPost}>
                                    Create Post
                                </Button>

                                <Button variant="contained" className={classes.button} onClick={() => this.editCollection(collectionDetail.id)}>
                                    Edit Collection
                            </Button>

                            {postsLoading ? <CircularProgress className={classes.progress} /> : null}
                            {posts ?
                                //<Paper className={classes.paper}>
                                <PostsList posts={posts} />
                                //x</Paper>
                                : null}
                        </Grid>

                        <Grid item xs={3} style={{paddingLeft: '2%', paddingRight: '2%'}}>
                            <Paper className={classes.paper}>
                                Whose Following? 
                                {collectionDetail.totalFavorites === 0 ? 'No one is following this collection yet.' : collectionDetail.totalFavorites}
                            </Paper>
                        </Grid>
                    </Grid>
                    : null}
                {collectionDetailError ? <div>Refresh</div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collectionDetail: state.collection.collectionDetail,
        collectionDetailLoading: state.collection.collectionDetailLoading,
        collectionDetailError: state.collection.collectionDetailError,

        posts: state.collection.posts,
        postsLoading: state.collection.postsLoading,
        postsError: state.collection.postsError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCollectionDetail: (id, history) => dispatch(getCollectionDetail(id, history)),
        getPostsList: (id, history) => dispatch(getPostsList(id, history)),
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(CollectionDetail);