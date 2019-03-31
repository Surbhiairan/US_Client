import React from 'react';
import { InputBase, CircularProgress, MenuItem, Popover } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { getSearchResults } from '../search.action';

const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
});

const Suggestions = (props) => {
    if(Object.entries(props.results).length > 0 && props.results.constructor === Object) {
        let collections = props.results.collections;
        let users = props.results.users;
        let posts = props.results.posts;
        let options = []
        if((collections && collections.length === 0) && (users && users.length === 0) && (posts && posts.length === 0)) {
            return null;
        } else {
            for(let i = 0; i< collections.length; i++) {
                options.push(collections[i]);
            }
            for(let i = 0; i< users.length; i++) {
                options.push(users[i]);
            }
            for(let i = 0; i< posts.length; i++) {
                options.push(posts[i]);
            }
        }
        const isMenuOpen = Boolean(props.anchorEl);
        const suggestion = 
                <Popover
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                anchorPosition={{top: 50, left: 48 }}
                    style={{top: '50px'}}
                    anchorEl= {props.anchorEl}
                    open={isMenuOpen}
                    onClose= {props.handleSearchClose}
                >
                    {options.map(option => (
                    <MenuItem key={option.id}>
                        { option.firstName 
                        ? 
                        <Link to={`/user/${option.id}`}>
                            {option.firstName || option.postTitle} 
                        </Link>
                        :
                        option.collectionTitle
                        ?
                        <Link to={`/collection/${option.id}`}>
                            {option.collectionTitle} 
                        </Link>
                        :
                        option.postTitle
                        ?
                        <Link to={`/post/${option.id}`}>
                            {option.postTitle} 
                        </Link>
                        :
                        null
                    }
                        
                    </MenuItem>
                    ))}
                </Popover>
                
        
        return <div> {suggestion} </div>
    } else {
        return null
    }
  }

class Search extends React.Component {

    state = {
        query: '',
        results: [],
        anchorEl: null
    }

    handleInputChange = (e) => {
        console.log("this is been called")
        this.setState({
            query: e.target.value,
            anchorEl: e.currentTarget
          }, () => {
            if (this.state.query && this.state.query.length > 2) {
                this.props.getSearchResults(this.state.query);
            } 
          })
    }
    
    render() {
        const { classes, searchResults, searchResultsLoading } = this.props;
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                { searchResultsLoading ? 
                <CircularProgress /> 
                : 
                <Suggestions 
                    anchorEl={this.state.anchorEl} 
                    results={searchResults}
                   // handleSearchClose={() => this.setState({ anchorEl: null})}
                    />
                    }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        searchResults: state.search.searchResults,
        searchResultsLoading: state.search.searchResultsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSearchResults: (query) => dispatch(getSearchResults(query))
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Search)