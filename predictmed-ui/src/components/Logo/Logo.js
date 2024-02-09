import logo from "../../assets/images/logo.png";
import {Box, Typography} from "@mui/material";

const Logo = () => {

    return (
        <Box sx={{pl: 8, mb: 0.5}}>
            <img src={logo} alt="Mantis" width="70"/>
            <Typography variant="h6">
                PredictMed
            </Typography>
        </Box>
    );
};

export default Logo;