import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Descriptor from "./Descriptor";

export default function ImageCard(props) {
    return (
        <Grid item xs={12} md={8} lg={6} onClick={props.onClick}>
            <Descriptor>{props.description}</Descriptor>
            <Box sx={{ height: "100%" }}>
                <img src={props.src} alt={props.alt} style={{ height: '100%', width: '100%' }}/>
            </Box>
        </Grid>
    )
}