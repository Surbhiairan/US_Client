import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import PictureUpload from '../../components/CustomUpload/PictureUpload';
import CollectionsList from '../../collection/views/CollectionsList';
import { followUser, getAnotherUserProfile, fetchUserCollections, getFollowedUser, unFollowUser } from '../user.action';
import image from '../../assets/img/default-avatar.png';

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

    UNFollowUser = () => {
        const { id } = this.props.match.params;
        this.props.unFollowUser(id)
    }

    followThisUser = () => {
        const { id } = this.props.match.params;
        this.props.followUser(id) 
    }

    render() {
        const {
            classes,
            userDetails,
            userDetailsLoading,
            userDetailsError,

            userCollections,
            userCollectionsLoading,
            userCollectionsError,

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
                        <Grid item xs={6}>

                            {userCollectionsLoading ? <CircularProgress className={classes.progress} /> : null}
                            {userCollections ?
                                <Paper className={classes.paper}>
                                    <CollectionsList collections={userCollections} />
                                </Paper>
                                : null}
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
        unFollowUser: (id) => dispatch(unFollowUser(id))
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(UserProfile);