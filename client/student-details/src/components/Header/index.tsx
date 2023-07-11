import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link} from "@mui/material";
import { useNavigation } from "react-router-dom";




const HeaderComponent:React.FC =()=>{

  const navigate=useNavigation();
      

    return(<> <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Details
            </Typography>
            <Link style={{color:"white",marginRight:"30px",cursor:"pointer"}}  href="/studentDetails" >Student</Link>
            <Link style={{color:"white",cursor:"pointer"}} href='/departmentDetails'>Department</Link>
          </Toolbar>
        </AppBar>
      </Box>
  </>);
};
export default HeaderComponent;