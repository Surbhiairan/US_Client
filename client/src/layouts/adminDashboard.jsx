import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Redirect, Route } from 'react-router-dom';

import { adminRoutes  } from '../routes/dashboard.routes'; 
import AdminHeader from '../components/Header/AdminHeader';

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

class adminDashboardLayout extends React.Component {
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

    render() {
        const { classes, ...rest } = this.props;

        let user = JSON.parse(localStorage.getItem('user'));
        let token = null;
        let role = null;
        if(user) {
            token = JSON.parse(localStorage.getItem('user')).token;
            role = JSON.parse(localStorage.getItem('user')).role
        }
        const PrivateRoute = ({ component: Component, ...rest }) => {
            //console.log("satte----", this.state);
            return (
            <Route
              {...rest}
              render={props =>
               token && role === 'admin' ? (
                  <Component {...props} />
                ) : (
                    <Redirect
                      to={
                        '/admin'
                      }
                    />
                  )
              }
            />
          );
            }

        return (
            <div>
                <AdminHeader {...rest} location={this.props.location}/>
                <div className={classes.wrapper} ref="wrapper">
                    {/* <div className={classes.fullPage}></div> */}
                    <Switch>
                        {adminRoutes.map((prop, key) => {
                            if (prop.collapse) {
                                return null;
                            }
                            if (prop.redirect) {
                                return (
                                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                                );
                            }
                            return (
                                <PrivateRoute
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

adminDashboardLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(adminDashboardLayout)