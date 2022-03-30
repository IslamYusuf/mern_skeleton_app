import React, { useEffect, useState } from 'react'
import {
    Button, Card, CardActions, CardContent,
    Icon, TextField, Typography, makeStyles
} from "@material-ui/core"
import { useNavigate, useLocation } from 'react-router-dom'

import { signin } from './api-auth'
import auth from './auth-helper'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600, margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(12),
        paddingBottom: theme.spacing(2)
    },
    error: { verticalAlign: 'middle' },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))

export default function Signin() {
    const location = useLocation()
    const navigate = useNavigate()
    const classes = useStyles()
    const [user, setUser] = useState({
        email: '', password: '', error: '',
        redirectToReferrer: false
    })

    const clickSubmit = () => {
        const updatedUser = {
            email: user.email || undefined,
            password: user.password || undefined
        }

        signin(updatedUser).then((data) => {
            if (data.error) {
                setUser({ ...user, error: data.error })
            } else {
                auth.authenticate(data, () => {
                    setUser({ ...user, error: '', redirectToReferrer: true })
                })
            }
        })
    }

    const handleChange = name => event => {
        setUser({ ...user, [name]: event.target.value })
    }

    const redirect = (location.state && location.state.from)
        ? location.state.from.pathname
        : '/'

    useEffect(() => {
        if (user.redirectToReferrer) {
            navigate(redirect, { replace: true })
        }
    }, [user.redirectToReferrer])

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign In
                    </Typography>
                    <TextField id="email" type="email" label="Email"
                        className={classes.textField}
                        value={user.email} onChange={handleChange('email')}
                        margin="normal" />
                    <br />
                    <TextField id="password" type="password" label="Password"
                        className={classes.textField} value={user.password}
                        onChange={handleChange('password')} margin="normal" />
                    <br />
                    {
                        user.error && (
                            <Typography component="p" color="error">
                                <Icon color="error" className={classes.error}>Error: </Icon>
                                {user.error}</Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={clickSubmit}
                        className={classes.submit}>Sign In</Button>
                </CardActions>
            </Card>
        </div>
    )
}