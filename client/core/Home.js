import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

import unicornbikeImg from './../assets/images/unicornbike.jpg'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600, margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    extraTop: { marginTop: theme.spacing(12) },
    media: { minHeight: 400 },
    credit: {
        padding: 10, textAlign: 'right',
        backgroundColor: '#ededed',
        borderBottom: '1px solid #d0d0d0',
        '& a': { color: '#3f4771' }
    }
}))

export default function Home() {
    const classes = useStyles()
    return (
        <div className={classes.extraTop}>
            <Card className={classes.card}>
                <Typography variant="h6" className={classes.title}>
                    Home Page
                </Typography>
                <CardMedia className={classes.media}
                    image={unicornbikeImg} title="Unicorn Bicycle" />
                <CardContent>
                    <Typography variant="body2" component="p">
                        Welcome to the MERN Skeleton home page.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}