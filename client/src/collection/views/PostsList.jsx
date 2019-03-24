import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
// import { Link } from 'react-router-dom';

// import GridItem from '../../components/Grid/GridItem';
import { Grid, Paper } from '@material-ui/core';
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
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
  },
});
class PostsList extends React.Component {
    
    handlePostClick = (post , history) => {
        console.log(post.id, "postlist");
        history.push('/post/' + post.id);
    }

    render() {
        const { 
            history,
            classes,
            posts
        } = this.props;


        if(posts.length>0) {
            return (
                <Grid justify="center">
                {posts.map(d => {
                  return (
                    d.postType === 2 
                      ? 
                      <VideoComponent post={d} postLink={d.postVideoUrl}
                        onPostClick={()=>this.handlePostClick(d, history)}
                      ></VideoComponent> 
                      : 
                    (d.postType === 1 
                      ?
                      <ImageComponent post={d} 
                        onPostClick={()=>this.handlePostClick(d, history)}></ImageComponent>
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
               <Paper className={classes.paper}> There are no posts yet</Paper>
            )
        }
    }
    
}

export default withStyles(styles) (PostsList);