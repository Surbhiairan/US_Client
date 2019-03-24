import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import GridItem from '../../components/Grid/GridItem';

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


class ImageComponent extends React.Component {

    

    render () {
        const { classes, post, favoritePost } = this.props;
        return (
            <GridItem xs={12}>
            <Card className={classes.card} raised={true}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={post.postImg}
                        title="Contemplative Reptile"
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
                    <Typography>
                    {post.totalComments} Comments
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <Divider light/>
                <CardActions>
                    {post.isFavorited ?
                        <Button variant="contained" color="primary" 
                            onClick = {favoritePost}>
                            UnFavorite
                        </Button>
                    :
                        <Button variant="contained" color="primary" 
                            onClick = {favoritePost}>
                            Favorite
                        </Button>
                    }
                        

                </CardActions>
            </Card>
            </GridItem>
        )
  
    }
}

export default withStyles(styles)(ImageComponent)