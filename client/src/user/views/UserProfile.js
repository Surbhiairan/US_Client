import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Divider, CardActions} from '@material-ui/core'

import { followUser, getAnotherUserProfile, fetchUserCollections, getFollowedUser, unFollowUser } from '../user.action';
import image from '../../assets/img/default-avatar.png';
import { followCollection, unFollowCollection } from '../../follow/follow.action';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
        float: 'right'
    },
    input: {
        display: 'none',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});
class UserProfile extends React.Component {

    state = {
        imagePreviewUrl: image
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id, "id");
        this.props.getAnotherUserProfile(id, this.props.history);
        this.props.fetchUserCollections(id, this.props.history);
        this.props.getFollowedUser();
    }

    handleFollowUser = (userDetails) => {
        this.props.followUser(userDetails, this.props.history);
    }

    followCollection = (id) => {
        let values = {
            collection_id: id
        }
        this.props.followCollection(values)
    }

    UNFollowCollection = (id) => {
        let values = {
            collection_id: id
        }
        this.props.unFollowCollection(values)
    }

    UNFollowUser = () => {
        const { id } = this.props.match.params;
        let values = {
            following_id: id
        }
        this.props.unFollowUser(values)
    }

    followThisUser = () => {
        const { id } = this.props.match.params;
        let values = {
            following_id: id
        }
        this.props.followUser(values) 
    }

    render() {
        const {
            classes,
            userDetails,
            userDetailsLoading,

            userCollections,
            userCollectionsLoading,

            followUser,
            followUserLoading,
            followUserError,

            getFollowedUser,
        } = this.props;

        let followed = false;

        if(getFollowedUser.length > 0) {
            getFollowedUser.map(user => {
                if(user.id === this.props.match.param) {
                    return followed = true
                }
            })
        }

        return (

            <div className={classes.root}>
                {userDetailsLoading ? <CircularProgress className={classes.progress} /> : null}

                {userDetails ?

                    <Grid container style={{ paddingLeft: '15%', paddingRight: '15%' }}>
                        <Grid item xs={12}>
                            <div className="picture-container">
                                <div className="picture">
                                    <img
                                        src={userDetails.profileImg}
                                        className="picture-src"
                                        alt="..."
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                            <p>{userDetails.name}</p>
                        </Grid>
                        <Grid item style={{float: 'right'}}>
                            {
                                followed ? 
                                <Button 
                                    color="primary" 
                                    variant="contained" 
                                    className={classes.button} 
                                    onClick={() => this.followThisUser()}
                                >
                                     Follow 
                                </Button>
                                :
                                <Button 
                                    color="primary" 
                                    variant="contained" 
                                    className={classes.button} 
                                    onClick= {() => this.UNFollowUser()}
                                >
                                    Un-Follow
                                </Button>
                            }
                            
                        </Grid>
                        
                        <Grid item style={{ textAlign: 'center' }}>
                            <p>{userDetails.bio}</p>
                        </Grid>
                        <Grid container direction={"row"} >
                            {userCollectionsLoading ? <CircularProgress className={classes.progress} /> : null}
                            { userCollections.map(collection => {
                                    return (
                                      <Grid item xs={4} style={{paddingLeft: '2%', paddingRight: '2%'}}>
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
                                            <CardActions>
                                                {
                                                    collection.isFollowed ? 
                                                    <Button color="secondary" variant="contained" onClick={() => this.UNFollowCollection(collection.id)}>
                                                        Un-Follow
                                                    </Button>
                                                    :
                                                    <Button color="secondary" variant="contained" onClick={() => this.followCollection(collection.id)}>
                                                        Follow
                                                    </Button>
                                                }
                                                
                                            </CardActions>
                                          </Card>
                                      </Grid>
                                    );
                                  })
                                }
                        </Grid>
                    </Grid>
                    : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.user.userDetails,
        userDetailsLoading: state.user.userDetailsLoading,
        userDetailsError: state.user.userDetailsError,

        userCollections: state.user.userCollections,
        userCollectionsLoading: state.user.userCollectionsLoading,
        userCollectionsError: state.user.userCollectionsError,

        followUser: state.user.followUser,
        followUserLoading: state.user.followUserLoading,
        followUserError: state.user.followUserError,

        getFollowedUserLoading: state.follow.getFollowedUserLoading,
        getFollowedUser: state.follow.getFollowedUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        followUser: (id, history) => dispatch(followUser(id, history)),
        getAnotherUserProfile: (id, history) => dispatch(getAnotherUserProfile(id, history)),
        fetchUserCollections: (id, history) => dispatch(fetchUserCollections(id, history)),
        getFollowedUser: () => dispatch(getFollowedUser()),
        unFollowUser: (id) => dispatch(unFollowUser(id)),
        followCollection: (id) => dispatch(followCollection(id)),
        unFollowCollection: (id) => dispatch(unFollowCollection(id))
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(UserProfile);