import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'

class CreatePost extends React.Component {
    render() {
        return (
            <Grid>
                <Typography align="center" variant="h5">
                    Select Post Type
                </Typography>
                <Link to={`/createPost/video`}>
                    Video
                </Link>
                <Link to={`/createPost/image`}>
                    Image
                </Link>
                <Link to={`/createPost/link`}>
                    Link
                </Link>
                <Link to={`/createPost/quote`}>
                    Quote
                </Link>
            </Grid>
        )
    }
}

export default CreatePost