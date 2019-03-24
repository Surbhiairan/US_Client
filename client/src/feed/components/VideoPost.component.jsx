import React from 'react';
import YouTube from 'react-youtube';
import { Card, Typography, CardContent, Button, Divider, CardActions } from '@material-ui/core';

import GridItem from '../../components/Grid/GridItem';

class VideoComponent extends React.Component {

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        const { postLink, post, favoritePost } = this.props;
        var id = postLink.split('=').pop();
        const opts = {
            height: '302',
            width: '678',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        //if(!d) return null
        return (
            <GridItem style={{ padding: '15px' }}>
                <Card >
                    <YouTube
                        videoId={id}
                        opts={opts}
                        onReady={this._onReady}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.postTitle}
                        </Typography>
                        <Typography component="p">
                            {post.postText}
                        </Typography>
                        <Typography component="p">
                            {post.totalFavorites} people follow this.
                    </Typography>
                        <Typography component="p">
                            {post.totalComments} comments
                        </Typography>
                    </CardContent>
                    <Divider light />
                    <CardActions>

                        <Button variant="contained" color="primary"
                            onClick = {favoritePost}
                        >
                            Favorite
                        </Button>
                    </CardActions>
                </Card>
            </GridItem>

        )
    }
}

export default VideoComponent