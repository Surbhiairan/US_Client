import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
// import { Link } from 'react-router-dom';

// import GridItem from '../../components/Grid/GridItem';
import { Grid } from '@material-ui/core';
import VideoComponent from '../../post/components/VideoPost.component';
import ImageComponent from '../../post/components/ImagePost.component';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    card: {
        maxWidth: 345,
    },
    media: {
      objectFit: 'cover',
    },
});
class PostsList extends React.Component {
    
    render() {
        const { 
            //classes,
            posts
        } = this.props;


        if(posts.length>0) {
            return (
                <Grid justify="center">
                {posts.map(d => {
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
                  
                  // return (
                  //   <GridItem >
                  //        <Card className={classes.card}>
                  //           <CardActionArea>
                  //           <CardMedia
                  //             component="img"
                  //             alt="Contemplative Reptile"
                  //             className={classes.media}
                  //             height="140"
                  //             image={d.header_image_url}
                  //             title="Contemplative Reptile"
                  //           />
                  //           <CardContent>
                  //               <Typography gutterBottom variant="h5" component="h2">
                  //                   {d.title}
                  //               </Typography>
                  //               <Typography component="p">
                  //                   {d.content}
                  //               </Typography>
                  //               <Typography component="p">
                  //                   {d.no_of_comments} comments
                  //               </Typography>
                  //           </CardContent>
                  //         </CardActionArea>
                  //       </Card>
                  //   </GridItem>
                  // );
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

export default withStyles(styles) (PostsList);