import {Skeleton} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";


const SkeletonLoader = () => (
    <Box sx={{width: '100%'}}>
            <Skeleton animation="wave" height={60}/>
            <Skeleton animation="wave" height={60}/>
            <Skeleton animation="wave" height={80}/>
            <Skeleton animation="wave" height={80}/>
            <Skeleton animation="wave" height={80}/>

    </Box>
)

export default SkeletonLoader;