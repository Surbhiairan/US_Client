import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import VideoComponent from '../components/VideoPost.component';
import ImageComponent from '../components/ImagePost.component';

import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addFavoritePost, addUnfavoritePost } from '../../post/post.action';

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

class FeedsPost extends React.Component {

    favoritePost = (id, history) => {
        //call follow collection api.
        let value = {
            post_id: id
        }
        console.log(value,"jdflkdj");
        this.props.addFavoritePost(value, history)
    }

    unfavoritePost = (id, history) => {
        //call follow collection api.
        let value = {
            post_id: id
        }
        console.log(value,"jdflkdj");
        this.props.addUnfavoritePost(value, history)
    }

    render() {
        const { feeds, history } = this.props;
        if(feeds.length>0) {
            return (
                <Grid >
                {feeds.map(d => {
                  return (
                    d.postType === 2 
                      ? 
                      <VideoComponent 
                        post={d} 
                        postLink={d.postVideoUrl}
                        favoritePost={() => this.favoritePost(d.id, history)}
                        unfavoritePost={() => this.unfavoritePost(d.id, history)}
                        ></VideoComponent> 
                      : 
                    (d.postType === 1 
                      ?
                      <ImageComponent 
                        post={d}
                        favoritePost={()=>this.favoritePost(d.id, history)}
                        unfavoritePost={() => this.unfavoritePost(d.id, history)}
                        ></ImageComponent>
                      :
                      null
                      )
                  )
                })}
              </Grid>
            )
        } 
        else {
            return (
                <div>You have no posts yet</div>
            )
        }
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
        addFavoritePost: (id, history) => dispatch(addFavoritePost(id, history)),
        addUnfavoritePost: (id, history) => dispatch(addUnfavoritePost(id, history)),
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(FeedsPost);