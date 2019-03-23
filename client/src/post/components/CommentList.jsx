import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import GridItem from '../../components/Grid/GridItem';
import { Grid, Divider } from '@material-ui/core';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    card: {
        width: 345,
        margin:5
    },
    media: {
      objectFit: 'cover',
    },
    maxLines: {
      display: 'block', /* or inline-block */
      textOverflow: 'ellipsis',
      wordWrap: 'break-word',
      overflow: 'hidden',
      maxHeight: '3.6em',
      lineHeight: '1.8em'
    }
});
class CommentList extends React.Component {

    render() {
        const { 
            classes,
            comments
        } = this.props;

        return (
          <Grid container direction={"row"}>
            {comments.map(comment => {
                return (
                  <GridItem >
                    <Card className={classes.card}>
                        <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" style={{textTransform: 'capitalize'}}>
                                {comment.comment}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                  </GridItem>
                );
            })}
          </Grid>
        
        )
    } 
    
}

export default withStyles(styles) (CommentList);