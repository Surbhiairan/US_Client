import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import VideoComponent from '../components/VideoPost.component';
import ImageComponent from '../components/ImagePost.component';

import { Grid } from '@material-ui/core';


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

    render() {
        const { feeds } = this.props;
        if(feeds.length>0) {
            return (
                <Grid >
                {feeds.map(d => {
                  return (
                    d.postType === 2 
                      ? 
                      <VideoComponent post={d} postLink={d.postVideoUrl}></VideoComponent> 
                      : 
                    (d.postType === 1 
                      ?
                      <ImageComponent post={d}></ImageComponent>
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

export default withStyles(styles)(FeedsPost)