import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { sendForgotPasswordLink } from '../auth.actions';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    gridItem: {
      textAlign: 'center'
    },
    gridContainer: {
      justifyContent: 'center'
    }
  });

class ForgotPassword extends React.Component {

    state = {
        email: ''
    }

    handleSubmit = (history) => {
        sendForgotPasswordLink(this.state.email, history)
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer className={classes.gridContainer}>
            <h2>
              Forgot Password
                        </h2>
            <GridItem xs={12} className={classes.gridItem}>
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={(e) => this.setState({ email: e.target.value})}
              />
            </GridItem>
            <GridItem xs={12} className={classes.gridItem} style={{paddingTop: '2%'}}>
              <Button variant="contained" onClick={() => this.handleSubmit(this.props.history)} color="primary" size="large" >
                Send Mail
              </Button>
            </GridItem>
            </GridContainer>
        )
    }
}

export default withStyles(styles)(ForgotPassword)