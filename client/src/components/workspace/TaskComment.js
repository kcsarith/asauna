import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
} from "@material-ui/core";
import Faker from "faker";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    }
}));

const Comment = ({ comment }) => {
    const classes = useStyles();
    return (
        <>
            <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar >{comment.User.username[0]}{comment.User.username[1]}</Avatar >
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography className={classes.fonts}>
                            {comment.User.username}
                        </Typography>
                    }
                    secondary={
                        <>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {/* {comment.email} */}
                            </Typography>
                            {` - ${comment.message}`}
                        </>
                    }
                />
            </ListItem>
            <Divider />
        </>
    );
};

export default Comment;
