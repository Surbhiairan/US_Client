import React from 'react';
import { Tabs, Tab, Paper, Typography, TextField, Button, FormLabel } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PictureUpload from '../../components/CustomUpload/PictureUpload';
import image from '../../assets/img/default-avatar.png';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { createProfile, getMyProfile } from '../profile.actions';

const styles = theme => ({
    root: {
      flexGrow: 1,
      justifyContent: 'center',
      textAlign: 'center'
    },
    multiLine: {
        width: '45%'
    },
    margin: {
        margin: theme.spacing.unit,
      },
    textField: {
        flexBasis: 200,
      },
});
  
const ProfileSchema = Yup.object().shape({
    about_you: Yup.string()
                .required("This field is required")    
})

class MyProfile extends React.Component {


    componentDidMount = () => {
        this.props.getMyProfile(this.props.history);
    }

    handleSubmit = (values) => {
        this.props.createProfile(values, this.props.history);
    }
   
    handleProfileImage = () => {
        console.log("lsjf");
    }

    render() {
        const { 
            classes,
            myProfileLoading,
            myProfile,
            myProfileError,
         } = this.props;

        if(myProfileLoading) {
            return(
                <CircularProgress className={classes.progress} />
            )
        }
        else {
        return (
            <div>
                <Button variant="contained" onClick={this.handleProfileImage}>
                    Upload New Image
                </Button>
                <div>
                        <Formik 
                            initialValues = {{
                                about_you: myProfile.about_you,
                                facebook_link: myProfile.facebook_link,
                                instagram_link: myProfile.instagram_link,
                                twitter_link: myProfile.twitter_link,
                                youTube_link: myProfile.youTube_link,
                            }}
                            validationSchema={ProfileSchema}
                            onSubmit={(values) => this.handleSubmit(values)}
                            
                            render={({values, handleChange, errors, touched, setFieldValue, handleSubmit}) => (
                        <GridContainer className={classes.gridContainer}>
                            <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="about_you"
                                className={classes.textField}
                                type="text"
                                name="about_you"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.about_you}
                            />
                            {errors.about_you && touched.about_you ? (
                                <div style={{ color: "red" }}>{errors.title}</div>
                            ) : null} 
                            </GridItem>
                            <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="facebook_link"
                                className={classes.textField}
                                type="text"
                                name="facebook_link"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.facebook_link}
                            />
                            </GridItem>
                            <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="instagram_link"
                                className={classes.textField}
                                type="text"
                                name="instagram_link"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.instagram_link}
                            />
                            </GridItem>
                            <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="twitter_link"
                                className={classes.textField}
                                type="text"
                                name="twitter_link"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.twitter_link}
                            />
                            </GridItem>

                            <GridItem xs={12} className={classes.gridItem}>
                            <TextField
                                id="youTube_link"
                                className={classes.textField}
                                type="text"
                                name="youTube_link"
                                margin="normal"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.youTube_link}
                            />
                            </GridItem>

                            <GridItem xs={12} className={classes.gridItem}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Save
                            </Button>
                        </GridItem>
                        </GridContainer>
                        )}
                        />
                        </div>
                    </div>
                )
        }
}
}

const mapStateToProps = (state) => {
    return{
        myProfile: state.profile.myProfile,
        myProfileLoading: state.profile.myProfileLoading,
        myProfileError: state.profile.myProfileError,   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (values, history) => dispatch(createProfile(values, history)),
        getMyProfile: (history) => dispatch(getMyProfile(history)),
    }
}

export default compose (withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MyProfile)