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
import { editProfile, getMyProfile } from '../profile.actions';

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

    state = {
        value: 0,
        file: null,
        imagePreviewUrl: image,
        description: '',
        facebook: '',
        instagram: '',
        twitter: '',
        youTube: ''
    };

    componentDidMount = () => {
        let userId = JSON.parse(localStorage.getItem('user')).id;
        this.props.getMyProfile(userId, this.props.history);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ imagePreviewUrl: nextProps.myProfile.profileImg })
    }

    handleSubmit = (values) => {
        console.log(values,"values in form");
        let value = {
            "profile_img": this.state.imagePreviewUrl,
            "bio": values.about_you,
            "f_link": values.facebook_link,
            "i_link": values.instagram_link,
            "t_link": values.twitter_link,
            "y_link": values.youTube_link,
        }
        this.props.editProfile(value, this.props.history);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleProfileChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        };
        reader.readAsDataURL(file);
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
                <PictureUpload
                    imagePreviewUrl= {this.state.imagePreviewUrl}
                    changeProfileImage= {this.handleProfileChange}
                />
                <div>
                        <Formik 
                            initialValues = {{
                                about_you: myProfile.bio,
                                facebook_link: myProfile.fLink,
                                instagram_link: myProfile.iLink,
                                twitter_link: myProfile.tLink,
                                youTube_link: myProfile.yLink,
                            }}
                            validationSchema={ProfileSchema}
                            onSubmit={(values) => this.handleSubmit(values)}
                            
                            render={({values, handleChange, errors, touched, setFieldValue, handleSubmit}) => (
                        <GridContainer className={classes.gridContainer}>
                            <GridItem xs={12} className={classes.gridItem}>
                            <FormLabel style={{lineHeight: 4}}>
                                Bio
                            </FormLabel>
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
                            <FormLabel style={{lineHeight: 4}}>
                                Facebook
                            </FormLabel>
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
                            <FormLabel style={{lineHeight: 4}}>
                                Instagram
                            </FormLabel>
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
                            <FormLabel style={{lineHeight: 4}}>
                                Twitter
                            </FormLabel>
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
                            <FormLabel style={{lineHeight: 4}}>
                                Youtube
                            </FormLabel>
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
        editProfile: (values, history) => dispatch(editProfile(values, history)),
        getMyProfile: (userId, history) => dispatch(getMyProfile(userId, history)),
    }
}

export default compose (withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MyProfile)