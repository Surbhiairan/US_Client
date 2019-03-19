import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import GridItem from '../../components/Grid/GridItem';
import PostsList from '../../collection/views/PostsList';

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
        const { classes, feeds } = this.props;
        return (
            <div>
                <PostsList posts = {feeds}/>
              
            </div>
        )
    }
}

export default withStyles(styles)(FeedsPost)