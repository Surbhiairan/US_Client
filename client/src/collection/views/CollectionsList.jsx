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
class CollectionsList extends React.Component {

    collectionDetail = (id) => {
      this.props.history.push('/myCollection/' + id)
    }
    
    render() {
        const { 
            classes,
            collections
        } = this.props;

            return (
                <Grid container direction={"row"}>
                {collections.map(collection => {
                  return (
                    <GridItem >
                      {/* <Link to={`/collection/${collection.id}`}> */}
                         <Card className={classes.card}>
                            <CardActionArea onClick={() => this.collectionDetail(collection.id)}>
                            <CardMedia
                              component="img"
                              alt=""
                              className={classes.media}
                              height="140"
                              image={collection.collectionImage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" style={{textTransform: 'capitalize'}}>
                                    {collection.collectionTitle}
                                </Typography>
                                <Typography component="p" style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    {collection.collectionText}
                                </Typography>
                                <Divider light/>
                                <Typography component="p" >
                                    {collection.totalFavorites } people follow this collection
                                </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      {/* </Link> */}
                    </GridItem>
                  );
                })}
              </Grid>
            
            )
        } 
    
}

export default withStyles(styles) (CollectionsList);