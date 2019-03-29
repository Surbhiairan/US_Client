import React from 'react';
import { Button } from '@material-ui/core';
import { activateUser } from '../auth.actions';

class EmailActivation extends React.Component {

    componentDidMount() {
        let href = window.location.href;
        console.log("href", href);
        let id = href.split('=')[1];
        console.log("id-----", id);
        activateUser(id)
    }

    render() {
        return (
            <div style={{ 'textAlign': 'center'}}>
                <h1>
                    Awesome! Your Email is activated.
                </h1>
                <h3>
                    Please login to continue
                </h3>
                
                <div style={{ 'paddingTop': '4%'}}>
                <Button variant="contained" color="default" onClick={() => { this.props.history.push('/login')}}>
                    Login
                </Button>
                </div>
               
            </div>
        )
    }

}

export default EmailActivation