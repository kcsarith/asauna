import React from 'react';

import { Container, Grid, Box, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">

            <p>Check out the source <a target='_blank' href='https://github.com/kcsarith/asauna'>here</a></p>
            {'Copyright © '}
                Krisna Sarith{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));
export default function SiteFooter() {

    const classes = useStyles();
    return (
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Grid container spacing={4} justify="space-evenly">
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: "column" }}>
                    <Typography variant="h6" color="textPrimary" style={{ textAlign: 'center' }} gutterBottom>
                        Social Media Links
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        Github
                    </Typography>
                    <Link href="https://github.com/kcsarith" target="_blank" variant="subtitle1" color="textSecondary">
                        <img src='https://www.flaticon.com/svg/static/icons/svg/25/25231.svg' height={32} />
                    </Link>
                </Grid>
                <Grid item xs={6} sm={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        Linked In
                    </Typography>
                    <Link href="https://www.linkedin.com/in/krisna-sarith-11788b1b9" target="_blank" variant="subtitle1" color="textSecondary">
                        <img src='https://image.flaticon.com/icons/png/512/61/61109.png' height={32} />
                    </Link>
                </Grid>
                <Grid item xs={6} sm={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        Angellist
                    </Typography>
                    <Link href="https://angel.co/u/krisna-charlie-sarith" target="_blank" variant="subtitle1" color="textSecondary">
                        <img src='https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angellist-512.png' height={32} />
                    </Link>
                </Grid>
                <Grid item xs={6} sm={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        Personal Site
                    </Typography>
                    <Link href="https://kcsarith.github.io/" target="_blank" variant="subtitle1" color="textSecondary">
                        <img src='https://cdn.onlinewebfonts.com/svg/img_379085.png' height={32} />
                    </Link>
                </Grid>
            </Grid>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}
// export default function GOODSiteFooter() {

//     const classes = useStyles();
//     return (
//         <Container maxWidth="md" component="footer" className={classes.footer}>
//             <Grid container spacing={4} justify="space-evenly">
//                 {footers.map((footer) => (
//                     <Grid item xs={6} sm={3} key={footer.title}>
//                         <Typography variant="h6" color="textPrimary" gutterBottom>
//                             {footer.title}
//                         </Typography>
//                         <ul>
//                             {footer.description.map((item) => (
//                                 <li key={item}>
//                                     <Link href="#" variant="subtitle1" color="textSecondary">
//                                         {item}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </Grid>
//                 ))}
//             </Grid>
//             <Box mt={5}>
//                 <Copyright />
//             </Box>
//         </Container>
//     )
// }
