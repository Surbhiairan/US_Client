import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'
import { connect } from 'react-redux';
import { compose } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridItem from '../../components/Grid/GridItem';
import { fetchFeeds } from '../feed.action';
import { followCollection } from '../../follow/follow.action';
import { Button } from '@material-ui/core';

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
        const { classes, feedsData, feedsLoading, feedsError } = this.props;
        if (feedsLoading) {
            return <CircularProgress className={classes.progress} />;
        }
        return (
            <Grid container
                spacing={16}
                direction="column"
                alignItems="center"
                justify="center"
                xs={12}
            >
                {feedsData.map((feed) => {
                    return (
                        <GridItem xs={12}>
                            <Card className={classes.card} raised={true}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2044756332276829&height=90&width=90&ext=1555332916&hash=AeRQyAosB43gGx-p"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {feed.collectionTitle}
                                        </Typography>
                                        <Typography component="p">
                                            {feed.collectionText}
                                        </Typography>
                                        <Button variant="contained" onClick={() => this.followCollection(feed.id)}>
                                            Follow
                                        </Button>
                                    </CardContent>
                                </CardActionArea>
                                <Divider light />
                                <CardActions>
                                    <Typography component="p">
                                        You and {feed.noOfFollowers} people follow this.
                                </Typography>
                                    <Typography>
                                        {feed.noOfComments} Comments
                                </Typography>
                                </CardActions>
                            </Card>
                        </GridItem>
                    )
                })}
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