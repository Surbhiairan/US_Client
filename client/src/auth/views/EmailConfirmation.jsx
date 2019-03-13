import React from 'react';
import { Typography, Button } from '@material-ui/core';

class EmailConfirmation extends React.Component {
    render() {
        return (
            <div style={{ 'textAlign': 'center'}}>
                <h1>
                    Awesome! You are almost there.
                </h1>
                <h3>
                    Confirm your email address to continue.
                </h3>
                <Typography variant="h7" >
                    We sent a confirmation mail to your email, click the link to finish signing up.
                </Typography>
                <div style={{ 'paddingTop': '4%'}}>
                <Button variant="contained" color="default">
                    The interner ate the email, resend it to me.
                </Button>
                </div>
               
            </div>
        )
    }

}

export default EmailConfirmation