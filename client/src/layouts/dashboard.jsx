import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Redirect, Route } from 'react-router-dom';

import { logout } from '../auth/auth.actions';
import { dashboardRoutes, otherRoutes } from '../routes/dashboard.routes'; 
import Header from '../components/Header/Header';

const styles = theme => ({
    root: {
        width: '100%',
    },
    wrapper: {
        height: "auto",
        minHeight: "100vh",
        position: "relative",
        top: "0",
        overflow: "hidden"
      },
      fullPage: {
        "&:before": {
        },
        "&:before,&:after": {
          display: "block",
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          zIndex: "2"
        }
      },
      fullPageBackground: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }
});

class dashboardLayout extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        tabValue: 0
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
       // this.handleMobileMenuClose();
    };

    handleChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    handleSignOut = () => {
        this.setState({ anchorEl: null });
        logout();
    }

    render() {
        const { classes, ...rest } = this.props;

        return (
            <div>
                <Header {...rest} location={this.props.location}/>
                <div className={classes.wrapper} ref="wrapper">
                    {/* <div className={classes.fullPage}></div> */}
                    <Switch>
                        {[...otherRoutes, ...dashboardRoutes].map((prop, key) => {
                            if (prop.collapse) {
                                return null;
                            }
                            if (prop.redirect) {
                                return (
                                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                                );
                            }
                            return (
                                <Route
                                    path={prop.path}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        })}
                    </Switch>
                </div>
            </div>
        )
    }
}

dashboardLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(dashboardLayout)