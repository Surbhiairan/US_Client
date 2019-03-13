import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CollectionsList from '../../collection/views/CollectionsList';
import { fetchUserDetails, fetchUserCollections, followUser } from '../user.action';

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
    },
    input: {
      display: 'none',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});
class UserProfile extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id, "id");
        this.props.fetchUserDetails(id, this.props.history);
        this.props.fetchUserCollections(id, this.props.history);
    }

    handleFollowUser = (userDetails) => {
        this.props.followUser(userDetails, this.props.history);
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
        } = this.props;

            return (
                
                <div className={classes.root}>
                {userDetailsLoading ? <CircularProgress className={classes.progress} />: null}
                
                {userDetails ? 

                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <img 
                    alt=''
                    style={{width: "100%",height: "200px",}} 
                    src = {userDetails.header_image_url}/>
                  </Grid>

                  <Grid item xs={3}>
                    <p>{userDetails.about_you}</p> 
                  </Grid>
                  <Grid item xs={6}>
                    {userDetails.is_followed?
                            <Button variant="contained" className={classes.button} >
                                Following
                            </Button>:
                            <Button variant="contained" className={classes.button} onClick = {()=>this.handleFollowUser(userDetails)}>
                                Follow User
                            </Button>
                    }
                    
                    {userCollectionsLoading ? <CircularProgress className={classes.progress} /> : null}
                    {userCollections ? 
                        <Paper className={classes.paper}>
                            <CollectionsList collections = {userCollections}/>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserDetails: (id, history) => dispatch(fetchUserDetails(id, history)),
        fetchUserCollections: (id, history) => dispatch(fetchUserCollections(id, history)),
        followUser: (userDetails, history) => dispatch(followUser(userDetails, history)),
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps)) (UserProfile);