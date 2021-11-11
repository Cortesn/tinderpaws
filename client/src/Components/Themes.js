import { styled } from '@mui/material/styles';


const SignInUpStyle = styled('div')(({ theme }) => ({
    padding: 0,
    [theme.breakpoints.down('md')]: {
        margin: 'auto',
        maxWidth: '350px ! important'
    },
    [theme.breakpoints.up('md')]: {
        margin: 'auto',
        maxWidth: '450px ! important'
    }
    
}));

export { SignInUpStyle }
