import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, TextField} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridItem from '../../components/Grid/GridItem';

import { getPostDetails, getPostComments, addComment } from '../post.action';
import CommentList from '../components/CommentList';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 700,
    },
    media: {
        height: 200,
    },
    textField: {
        width: '100%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
        float: "right"
    },
    input: {
        display: 'none',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    grid: {
        padding: '5%'
    }
});
class PostDetail extends React.Component {
    state = {
        comment: null
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id, "postid");
        this.props.getPostDetails(id, this.props.history);
        this.props.getPostComments(id, this.props.history);
    }

    handleChangeComment = (e) => {
        this.setState({comment : e.target.value})
    }
    
    addComment = (id) => {
        let values = {
            post_id: id,
            comment: this.state.comment
        }
        this.props.addComment(values, this.props.history);
    }

    render() {
        const {
            classes,
            postDetails,
            postDetailsLoading,
            postDetailsError,

            postComments,
            postCommentsLoading,
            postCommentsError

        } = this.props;

        return (

            <div className={classes.root}>
                    <Grid container spacing={24}>
                    <Grid item xs={3} style={{paddingLeft: '2%', paddingRight: '2%'}}></Grid>
                        <Grid item xs={6} style={{paddingLeft: '2%', paddingRight: '2%'}}>
                            {postDetailsLoading ? <CircularProgress className={classes.progress} /> : null}
                            {postDetails ?
                                <Card className={classes.card} raised={true}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={postDetails.postImg}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {postDetails.postTitle}
                                        </Typography>
                                        <Typography component="p">
                                            {postDetails.postText}
                                        </Typography>
                                    
                                    <GridItem className={classes.gridItem}>
                                    <TextField
                                        id="post_comment"
                                        label="Comment"
                                        className={classes.textField}
                                        type="text"
                                        name="post_comment"
                                        autoComplete="post_comment"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={e => this.handleChangeComment(e)}
                                        multiline={true}
                                        rows={3}
                                    /></GridItem></CardContent>
                                    <GridItem xs={12} className={classes.gridItem}>
                                        <Button variant="contained" className={classes.button} onClick={()=>this.addComment(postDetails.id)}>
                                            Add Comment
                                        </Button>
                                    </GridItem>
                                </CardActionArea>
                                <Divider light/>
                            </Card>
                            : null }

                            {postCommentsLoading ? <CircularProgress className={classes.progress} /> : null}
                            {postComments.length ?
                                <CommentList comments={postComments} />
                                : <h2>No comments</h2>}
                        </Grid>
                        <Grid item xs={3} style={{paddingLeft: '2%', paddingRight: '2%'}}></Grid>
                    </Grid>
                {postCommentsError ? <div>Refresh</div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postDetails: state.post.postDetails,
        postDetailsLoading: state.post.postDetailsLoading,
        postDetailsError: state.post.postDetailsError,

        postComments: state.post.postComments,
        postCommentsLoading: state.post.postCommentsLoading,
        postCommentsError: state.post.postCommentsError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPostDetails: (id, history) => dispatch(getPostDetails(id, history)),
        getPostComments: (id, history) => dispatch(getPostComments(id, history)),
        addComment: (values, history) => dispatch(addComment(values, history))
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(PostDetail);