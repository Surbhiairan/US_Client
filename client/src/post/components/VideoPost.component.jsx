import React from 'react';
import YouTube from 'react-youtube';
import { Card, Typography, CardContent } from '@material-ui/core';

import GridItem from '../../components/Grid/GridItem';

class VideoComponent extends React.Component {

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        const { postLink, post } = this.props;
        var id = postLink.split('=').pop();
          const opts = {
            height: '300',
            width: '702',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
          };
          //if(!d) return null
        return (
              <GridItem >
                    
                    <YouTube
                        videoId={id}
                        opts={opts}
                        onReady={this._onReady}
                    />
                    <Card >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography component="p">
                            {post.content}
                        </Typography>
                        <Typography component="p">
                            {post.no_of_comments} comments
                        </Typography>
                    </CardContent>
                </Card>
            </GridItem>
           
        )
    }
}

export default VideoComponent