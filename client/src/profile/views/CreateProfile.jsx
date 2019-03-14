import React from 'react';
import { Tabs, Tab, Paper, Typography, TextField, Button, FormLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import PictureUpload from '../../components/CustomUpload/PictureUpload';
import image from '../../assets/img/default-avatar.png';
import GridItem from '../../components/Grid/GridItem';

import { createProfile } from '../profile.actions';

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
  

class CreateProfile extends React.Component {
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

    handleCreateProfile = (e) => {
        e.preventDefault();
        //let user = JSON.parse(localStorage.getItem('user'));
        let values = {
            "profile_img": this.state.imagePreviewUrl,
            "bio": this.state.description,
            "f_link": this.state.facebook,
            "i_link": this.state.instagram,
            "t_link": this.state.twitter,
            "y_link": this.state.youTube,
        }
        this.props.createProfile(values, this.props.history);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Typography variant="h6">
                    Profile setup
                </Typography>
                <Link to={`/feeds`}>
                    Skip
                </Link>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Image Upload" />
                    <Tab label="About you" />
                    <Tab label="Social Accounts" />
                </Tabs>
                {this.state.value === 0 && (
                    <Paper elevation={1}>
                        <Typography variant="h5" >
                            Upload Image
                        </Typography>
                        <PictureUpload
                            imagePreviewUrl= {this.state.imagePreviewUrl}
                            changeProfileImage= {this.handleProfileChange}
                        />
                        <Button color="primary" variant="contained" onClick={(e) => this.handleChange(e, 1)}>
                            Next
                        </Button>
                    </Paper>
                )}
                {this.state.value === 1 && (
                    <Paper>
                        <Typography variant="h5" >
                            Tell Us About Yourself
                        </Typography>
                       <TextField
                            id="description"
                            multiline
                            rows="8"
                            value={this.state.description}
                            onChange={e => this.setState({description: e.target.value})}
                            className={classes.multiLine}
                            margin="normal"
                            variant="outlined"
                        />
                        <div>
                        <Button color="primary" variant="contained" onClick={(e) => this.handleChange(e, 2)}>
                            Next
                        </Button>
                        </div>
                        
                    </Paper>
                )}
                {this.state.value === 2 && (
                    <Paper>
                        <Typography variant="h5" style={{textAlign: 'center'}}>
                           Link Social Accounts
                        </Typography>
                        <GridItem xs={12}>
                            <FormLabel style={{lineHeight: 4}}>
                                Facebook 
                            </FormLabel>
                            <TextField
                                id="facebook-username"
                                className={classNames(classes.margin, classes.textField)}
                                variant="outlined"
                                onChange={e => this.setState({facebook: e.target.value})}
                            />
                        </GridItem>
                        <GridItem xs={12}>
                            <FormLabel style={{lineHeight: 4}}>
                                Instagram 
                            </FormLabel>
                            <TextField
                                id="instagram-username"
                                className={classNames(classes.margin, classes.textField)}
                                variant="outlined"
                                onChange={e => this.setState({instagram: e.target.value})}
                            />
                        </GridItem>
                        <GridItem xs={12} >
                            <FormLabel style={{lineHeight: 4}}>
                                Twitter     
                            </FormLabel>
                            <TextField
                                id="twitter-username"
                                className={classNames(classes.margin, classes.textField)}
                                variant="outlined"
                                style={{paddingLeft: '1.5%'}}
                                onChange={e => this.setState({twitter: e.target.value})}
                            />
                        </GridItem>
                        <GridItem xs={12}>
                            <FormLabel style={{lineHeight: 4}}>
                                You-Tube 
                            </FormLabel>
                            <TextField
                                id="youTube-username"
                                className={classNames(classes.margin, classes.textField)}
                                variant="outlined"
                                onChange={e => this.setState({youTube: e.target.value})}
                            />
                        </GridItem>
                        <div>
                        <Button color="primary" variant="contained" onClick={(e) => this.handleCreateProfile(e)}>
                            Next
                        </Button>
                        </div>

                    </Paper>
                )}
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (values, history) => dispatch(createProfile(values, history))
    }
}

export default compose (withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(CreateProfile)