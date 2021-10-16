import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// create main tab panel
export default function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {value === index && (
            <Paper sx={{ p: 3 }}>
                <Typography component={'span'}>{children}</Typography>
            </Paper>
            )}
        </div>
    );
}