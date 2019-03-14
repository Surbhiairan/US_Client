import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

import GridItem from '../../components/Grid/GridItem';
import { Grid } from '@material-ui/core';

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
class CollectionsList extends React.Component {
    
    render() {
        const { 
            classes,
            collections
        } = this.props;

            return (
                <Grid container direction={"row"} justify="center">
                {collections.map(collection => {
                  return (
                    <GridItem >
                      <Link to={`/collection/${collection.id}`}>
                         <Card className={classes.card}>
                            <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              className={classes.media}
                              height="140"
                              image={collection.collectionImage}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {collection.collectionTitle}
                                </Typography>
                                <Typography component="p">
                                    {collection.collectionText}
                                </Typography>
                                <Typography component="p">
                                    {collection.no_of_followers} people follow this collection
                                </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Link>
                    </GridItem>
                  );
                })}
              </Grid>
            
            )
        } 
    
}

export default withStyles(styles) (CollectionsList);