import React from 'react';
import { fetchAllUsers, revokeUser } from '../admin.action';
import { Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
});

class ViewUsers extends React.Component {
    
    componentDidMount(){
        this.props.fetchAllUsers(this.props.history);
    }

    handleRevoke = (id) => {
        let values = {
            "user_id": id
        }
        this.props.revokeUser(values, this.props.history);
    }

    render() {
        const {
            classes,
            allUsers,
            allUsersLoading,
            allUsersError,
        } = this.props;

        return (
            <div className={classes.root}>
            {allUsersLoading ? <CircularProgress className={classes.progress} /> : null}
            {allUsers?
                (
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="right">Name</TableCell>
                              <TableCell align="right">Email</TableCell>
                              <TableCell align="right">Active</TableCell>
                              <TableCell align="right">Total Collections</TableCell>
                              <TableCell align="right">Total Followers</TableCell>
                              <TableCell align="right">Revoke Access</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {allUsers.map(row => (
                              <TableRow key={row.id}>
                                <TableCell align="right">{row.firstName}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.isActive? <p>Yes</p>: <p>No</p>}</TableCell>
                                <TableCell align="right">{row.totalCollection}</TableCell>
                                <TableCell align="right">{row.totalFollowers}</TableCell>
                                <TableCell align="right">
                                {row.isActive? 
                                <Button variant="contained" onClick={()=>this.handleRevoke(row.id)} color="primary">
                                    Revoke
                                </Button> :null}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </Paper>
                ): null
            }
            {allUsersError ? <div>Refresh</div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.admin.allUsers,
        allUsersError: state.admin.allUsersError,
        allUsersLoading: state.admin.allUsersLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsers: (history) => dispatch(fetchAllUsers(history)),
        revokeUser: (values, history) => dispatch(revokeUser(values, history)),
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(ViewUsers);