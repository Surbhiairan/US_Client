import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem,List, ListItem, Typography, Hidden } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import { adminRoutes } from '../../routes/dashboard.routes'; 
import Search from '../../search/view/Search';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    list: {
        fontSize: "14px",
        margin: 0,
        marginRight: "-15px",
        paddingLeft: "0",
        listStyle: "none",
        color: "#FFFFFF",
        paddingTop: "0",
        paddingBottom: "0"
      },
      listItem: {
        float: "left",
        position: "relative",
        display: "block",
        width: "auto",
        margin: "0",
        padding: "0",
        [theme.breakpoints.down("sm")]: {
          zIndex: "999",
          width: "100%",
          paddingRight: "15px"
        }
      },
      navLink: {
        color: "#FFFFFF",
        margin: "0 5px",
        paddingTop: "15px",
        paddingBottom: "15px",
        fontWeight: "500",
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        lineHeight: "20px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        textDecoration: "none",
        "&:hover,&:focus": {
          color: "#FFFFFF",
          background: "rgba(200, 200, 200, 0.2)"
        }
    }
});


class AdminHeader extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        tabValue: 0,
        query: '',
        results: []
    };

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
          this.setState({open: false});
        }
      }

    handleProfileMenuOpen = event => {
        //navigate to edit profile page
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.props.history.push('/myprofile');
       // this.handleMobileMenuClose();
    };

    handleChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    handleSignOut = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login');
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
      }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
            </Menu>
        );


        return (

            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Search/>
                        <div className={classes.grow}>
                        <Hidden smDown implementation="css">
            
                        <List className={classes.list}>
                                {adminRoutes.map((prop, key) => {
                                if (prop.redirect) {
                                    return null;
                                }
                                const navLink =
                                    classes.navLink +
                                    cx({
                                    [" " + classes.navLinkActive]: this.activeRoute(prop.path)
                                    });
                                return (
                                    <ListItem key={key} className={classes.listItem}>
                                    <NavLink to={prop.path} className={navLink}>
                                        <Typography color='inherit'>
                                            {prop.name}
                                        </Typography>
                                    </NavLink>
                                    </ListItem>
                                );
                                })}
                            </List>
                            </Hidden>
                        </div>
                        <div className={classes.sectionDesktop}>
                            
                            <IconButton color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-owns={ isMenuOpen ? 'material-appbar' : undefined }
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={ this.handleMobileMenuOpen } color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </div>
        )
    }
}

AdminHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AdminHeader)