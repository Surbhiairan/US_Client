import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchFeeds } from '../feed.action';
import { followCollection } from '../../follow/follow.action';
import FeedsCollection from './FeedsCollection';
import FeedsPost from './FeedsPost';

const styles = theme => ({
    card: {
        maxWidth: 700,
    },
    media: {
        height: 200,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class Feeds extends React.Component {

    componentDidMount() {
        this.props.fetchFeeds();
    }

    followCollection = (id) => {
        //call follow collection api.
        let value = {
            collection_id: id
        }
        this.props.followCollection(value, this.props.history)
    }

    render() {
        const { classes, feedsData, feedsLoading } = this.props;
        if (feedsLoading) {
            return <CircularProgress className={classes.progress} />;
        }
        if (Object.entries(feedsData).length === 0 && feedsData.constructor === Object) {
            return <Typography> You have nothing new to read here, create a collection or search for friends </Typography>
            //console.log("empty json object")
        }
        let posts, collection = null;
        if(feedsData.posts) {
           posts =  <FeedsPost feeds={feedsData.posts} history={this.props.history}/> 
        }
        if(feedsData.collections) {
            collection = <FeedsCollection feeds={feedsData.collections} history={this.props.history}/>
        }
        return (
            <Grid container
                spacing={16}
                direction="column"
                alignItems="center"
                justify="center"
                xs={12}
            >
                {posts}
                {collection}
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        feedsLoading: state.feeds.feedsLoading,
        feedsData: state.feeds.feeds,
        feedsError: state.feeds.feedsError,
        followCollectionList: state.follow.followCollection,
        followCollectionError: state.follow.followCollectionError,
        followCollectionLoading: state.follow.followCollectionLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFeeds: () => dispatch(fetchFeeds()),
        followCollection: (id, history) => dispatch(followCollection(id, history))
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Feeds)