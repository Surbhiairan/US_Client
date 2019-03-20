import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getFollowedCollections } from '../follow.action';
import GridItem from '../../components/Grid/GridItem';
import { Grid } from '@material-ui/core';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class Following extends React.Component {

    componentDidMount() {
        this.props.getFollowedCollections()
    }

    render() {
        const { 
            classes,
            getFollowCollection,
            getFollowCollectionLoading
        } = this.props;

        if(getFollowCollectionLoading) {
            return <CircularProgress className={classes.progress} />
        }

        return (
            <Grid container direction={"row"} justify="center">
            {getFollowCollection.map(collection => {
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

const mapStateToProps = (state) => {
    return {
        getFollowCollection: state.follow.getFollowCollection,
        getFollowCollectionLoading: state.follow.getFollowCollectionLoading,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFollowedCollections: () => dispatch(getFollowedCollections())
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps)) (Following)