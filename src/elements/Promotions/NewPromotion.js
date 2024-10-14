import React, {useState} from "react";
import {Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid, 
    Link, Button, FormControlLabel, RadioGroup, Radio} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { addPromotion, resetPromotion } from "../../store/actions/promotion-actions";
import { Alert, Stack } from '@mui/material';

function NewPromotion(){

    const [promotionData, setPromotionData] = useState({nm : '', campaign : "", discount : "", promo : "", 
        start_dt : null, end_dt : null, desc : '', discountType : ''});
    const [checkError, setCheckError] = useState(false);

    const textFieldChange = (e) => {
        const {name, value} = e.target;
        setPromotionData((prevSate) => ({...prevSate, [name]: value}));
    }

    const validateFields = () => {
        for(const item of Object.keys(promotionData)) {
            if(!promotionData[item]) {
                return false;
            }
        }
        return true;
    }

    const handleCreate = () => {
        const isValidFields = validateFields();
        if(!isValidFields) {
            setCheckError(true);
            return;
        }
    }

    return (
        <Box className = "newpromotion-main">
            <Typography className = "page-title">New Promotion</Typography>
            <Grid container className = "text-boxes-gap">
                <Grid item xs = {12}>
                    <Grid container spacing = {2}>
                        <Grid item xs = {4}>
                            <TextField required = {true} fullWidth label = "Promotion Name" name = "nm" 
                                className = {promotionData.nm === "" && checkError === true ? "error-border" : "input-text" }
                                value = {promotionData.nm} onChange = {textFieldChange}/>
                        </Grid>
                        <Grid item xs = {4}>
                            <FormControl required fullWidth>
                                <InputLabel id = "campaign">Select Campaign</InputLabel>
                                <Select labelId = "campaign" label = "Select Campaign" value={promotionData.campaign}  required onChange={textFieldChange} 
                                    className = {promotionData.campaign === "" && checkError === true ? "error-border" : "input-text" } name = "campaign">
                                        {   ["Information Updates",  "Event Announcements", "Festival Updates", "Billing and Payments", "Facility Updates", "General" ].map((item,index) => (
                                        <MenuItem key = {index} value = {item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                {/*<Grid item xs = {12}>
                    <Grid container spacing = {2}>
                        
                    </Grid>
                </Grid>*/}
                <Grid item xs = {12}>
                    <Grid container spacing = {2}>
                        <Grid item xs = {12}>
                            <Box className = "radio-buttons-main">
                                <Typography>Discount Type</Typography>
                                <FormControl>
                                    <RadioGroup name = "discountType" value = {promotionData.discountType} onChange = {textFieldChange} row>
                                        <FormControlLabel value="Percentage" control={<Radio />} label="Percentage" />
                                        <FormControlLabel value="Fixed Type" control={<Radio />} label="Fixed Type" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs = {12}>
                    <Grid container spacing = {2}>
                        <Grid item xs = {4}>
                            <TextField required = {true} fullWidth label="Discount Value" name = "discount" 
                                className = {promotionData.discount === "" && checkError === true ? "error-border" : "input-text" }
                                    value = {promotionData.discount } onChange = {textFieldChange} />
                        </Grid>
                        <Grid item xs = {4}>
                            <TextField required = {true} fullWidth label="Promo Code" name = "promo" 
                                className = {promotionData.promo === "" && checkError === true ? "error-border" : "input-text" }
                                    value = { promotionData.promo } onChange = {textFieldChange} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs = {12}>
                    <Grid container spacing = {2}>
                        <Grid item xs = {4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format ="DD/MM/YYYY" fullWidth label = "Start Date" 
                                    className = {!promotionData.start && checkError === true ? "error-border" : "input-text" }
                                    value = { promotionData["start_dt"] ? dayjs(promotionData["start_dt"], "DD/MM/YYYY") : null } required
                                        onChange={(newValue) => textFieldChange({ target: { name: "start_dt", value: newValue || null, type: 'date' } })}
                                            renderInput={(params) => <TextField {...params} fullWidth />}/>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs = {4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format ="DD/MM/YYYY" fullWidth label = "End Date"
                                    className = {!promotionData.end && checkError === true ? "error-border" : "input-text" } name = "end_dt" 
                                        value = { promotionData["end_dt"] ? dayjs(promotionData["end_dt"], "DD/MM/YYYY") : null } required
                                            onChange={(newValue) => textFieldChange({ target: { name: "end_dt", value: newValue || null, type: 'date' } })}
                                            renderInput={(params) => <TextField {...params} fullWidth />}/>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs = {8}>
                    <TextField required = {true} multiline = {true} rows={4} label = "Description"  value = {promotionData.desc} name = "desc" 
                    className = {!promotionData.desc && checkError === true ? "error-border" : "input-text" }
                        fullWidth onChange ={textFieldChange}  /> 
                </Grid>
                <Grid item xs = {12}>
                    <Box className = "buttons-container">
                        <Link to="/noticeboard"><Button className = "button cancel">Cancel</Button></Link>
                        <Button className = "button" onClick = {handleCreate}>Create</Button>
                        <Link to="/noticeboard" style={{ display: "none" }}></Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NewPromotion;