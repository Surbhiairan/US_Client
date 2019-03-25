import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Videocam, Image} from '@material-ui/icons';
import { withStyles} from '@material-ui/core'

const styles = () => ({
    flexContainer: {
        display: 'flex'
    }
})

class CreatePost extends React.Component {

    render() {
        return (
            <Grid>
                <Typography align="center" variant="h5">
                    Select Post Type
                </Typography>
                <Grid style={{flexDirection: 'column', textAlign: 'center'}}>
                    <Videocam/>
                    <Link to={`/createPost/video`}>
                        Video
                    </Link>
                </Grid>
                <Grid style={{flexDirection: 'column', textAlign: 'center'}}>
                    <Image/>
                    <Link to={`/createPost/image`}>
                        Image
                    </Link>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(CreatePost)