import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';

import GridItem from '../../components/Grid/GridItem';
import { followCollection, unFollowCollection } from '../../follow/follow.action';


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

class FeedsCollection extends React.Component {

    unFollowCollection = (id, history) => {
        let value = {
            collection_id: id
        }
        this.props.unFollowCollection(value, history)
    }

    followCollection = (id, history) => {
        //call follow collection api.
        let value = {
            collection_id: id
        }
        this.props.followCollection(value, history)
    }

    render() {
        const { classes, feeds, followCollectionList, history } = this.props;

        return (
            <div>
                {feeds.map((feed) => {
                    return (
                        <GridItem xs={12} style={{padding: '15px'}}>
                            <Card className={classes.card} raised={true}>
                                {/* <CardActionArea> */}
                                    <CardMedia
                                        className={classes.media}
                                        image={feed.collectionImage}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {feed.collectionTitle}
                                        </Typography>
                                        <Typography component="p">
                                            {feed.collectionText}
                                        </Typography>
                                        {
                                            followCollectionList.length > 0 
                                            ?
                                            followCollectionList.map((collection) => {
                                                // if (collection.id === feed.id) {
                                                //     return (
                                                //         <Button variant="contained" onClick={() => this.unFollowCollection(feed.id, history)}>
                                                //             Un-Follow
                                                //         </Button>
                                                //     )
                                                // } else {
                                                //     return (
                                                //         <Button variant="contained" onClick={() => this.followCollection(feed.id)}>
                                                //             Follow
                                                //         </Button>
                                                //     )
                                                // }
                                                return (
                                                    <Button variant="contained" onClick={() => this.followCollection(feed.id)}>
                                                       {collection.id === feed.id ? 'Un-Follow' : 'Follow'} 
                                                    </Button>
                                                )
                                            })
                                            :
                                            <Button variant="contained" onClick={() => this.followCollection(feed.id)}>
                                                Follow
                                            </Button>
                                        }
                                    </CardContent>
                                {/* </CardActionArea> */}
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        followCollectionList: state.follow.followCollection,
        followCollectionError: state.follow.followCollectionError,
        followCollectionLoading: state.follow.followCollectionLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        followCollection: (id, history) => dispatch(followCollection(id, history)),
        unFollowCollection: (id, history) => dispatch(unFollowCollection(id, history))
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(FeedsCollection)