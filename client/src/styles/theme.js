import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#b09dff',
            main: '#796eff',
            dark: '#3e42cb',
            contrastText: '#fff',
        },
    },
    status: {
        danger: 'orange',
    },
})

export default theme;
