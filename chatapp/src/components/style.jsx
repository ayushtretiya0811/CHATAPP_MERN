
// import React from 'react';
// import { Stylee } from "@mui/icons-material"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@mui/system/styled'
export const StyledButton = styled(Button)({
    margin: "10px 5px",  
       
    backgroundColor:"black",
   ' &:hover':{
        backgroundColor:"green",
    }


})
export const StyledTextField = styled(TextField)({
    color:"black",
    margin: "10px 5px",

 
        '& .MuiInput-underline:after': {
                color:"green",
                borderBottomColor: "green",
          
       
    },
    '& .MuiInputLabel-root': {
        color: "green", // Change the label color
        '&.Mui-focused': {
           color: "green", // Ensure the label color remains green when focused
        }
       }
})