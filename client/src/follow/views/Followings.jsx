import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getFollowedCollections, unFollowCollection } from '../follow.action';
import { getFollowedUser, unFollowUser } from '../../user/user.action';
import GridItem from '../../components/Grid/GridItem';
import { Grid, Divider, Button, CardActions } from '@material-ui/core';

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
        this.props.getFollowedCollections();
        this.props.getFollowedUser();
    }

    collectionDetail = (id) => {
      this.props.history.push('/collection/'+ id);
    }

    userProfile = (id) => {
      this.props.history.push('/user/'+ id);
    }

    UNFollowCollection = (id) => {
      let values = {
        collection_id: id
      }
      this.props.unFollowCollection(values, this.props.history)
    }

    UNFollowUser = (id) => {
      let values = {
        following_id: id
      }
      this.props.unFollowUser(values, this.props.history)
    }

    render() {
        const { 
            classes,
            getFollowCollection,
            getFollowCollectionLoading,

            getUser,
        } = this.props;

        if(getFollowCollectionLoading) {
            return <CircularProgress className={classes.progress} />
        }
      //   if(getFolledUserLoading) {
      //     return <CircularProgress className={classes.progress} />
      // }


        return (
            <Grid container direction={"row"} justify="center">
            {getFollowCollection.map(collection => {
              return (
                <GridItem xs={3}>
                     <Card className={classes.card}>
                        <CardActionArea onClick={() => this.collectionDetail(collection.id)}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          className={classes.media}
                          height="140"
                          image={collection.collectionImage}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" style={{textTransform: 'capitalize'}}>
                                {collection.collectionTitle}
                            </Typography>
                            <Typography component="p" style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                {collection.collectionText}
                                
                            </Typography>
                            
                            <Divider light/>
                            <Typography component="p">
                                {collection.totalFavorites} people follow this collection
                            </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                      <Button color="secondary" variant="contained" onClick={() => this.UNFollowCollection(collection.id)}>
                              Un-Follow
                            </Button>
                      </CardActions>
                    </Card>
                </GridItem>
              );
            })}
            {getUser.map(user => {
              return (
                <GridItem xs={3}>
                     <Card className={classes.card}>
                        <CardActionArea onClick={() => this.userProfile(user.id)}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          className={classes.media}
                          height="140"
                          image={user.profileImg}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" style={{textTransform: 'capitalize'}}>
                                {user.firstName}
                            </Typography>
                            <Typography component="p" style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                {user.bio}
                                
                            </Typography>
                            
                            <Divider light/>
                            <Typography component="p">
                                {user.totalFollowers} people follow this collection
                            </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                      <Button color="secondary" variant="contained" onClick={() => this.UNFollowUser(user.id)}>
                              Un-Follow
                            </Button>
                      </CardActions>
                    </Card>
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
      
        getUser: state.follow.getFollowedUser,
        getFollowedUserLoading: state.follow.getFollowedUserLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFollowedCollections: () => dispatch(getFollowedCollections()),
        getFollowedUser: () => dispatch(getFollowedUser()),
        unFollowCollection: (id, history) => dispatch(unFollowCollection(id, history)),
        unFollowUser: (id, history) => dispatch(unFollowUser(id, history))

    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps)) (Following)