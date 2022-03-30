import React, { useEffect, useState } from 'react'
import {
    Avatar, Divider, IconButton, List,
    ListItem, ListItemAvatar, ListItemSecondaryAction,
    ListItemText, makeStyles, Paper, Typography,
} from '@material-ui/core'
import { Edit, Person } from '@material-ui/icons'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'

import { read } from './api-user'
import auth from '../auth/auth-helper'
import DeleteUser from './DeleteUser'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600, margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(12)
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    }
}))

export default function Profile() {
    const classes = useStyles()
    const { userId } = useParams()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        const jwt = auth.isAuthenticated()

        read({ userId }, { t: jwt.token }, signal)
            .then((data) => {
                if (data && data.error) {
                    navigate('/signin', { state: { from: { pathname } }, replace: true })
                } else {
                    setUser(data)
                }
            })

        return function cleanup() {
            abortController.abort()
        }
    }, [userId])

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar><Person /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />
                    {auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
                        (<ListItemSecondaryAction>
                            <Link to={"/user/edit/" + user._id}>
                                <IconButton aria-label="Edit" color="primary">
                                    <Edit />
                                </IconButton>
                            </Link>
                            <DeleteUser userId={user._id} />
                        </ListItemSecondaryAction>)
                    }
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={"Joined: " + (
                        new Date(user.created)).toDateString()} />
                </ListItem>
            </List>
        </Paper>
    )
}