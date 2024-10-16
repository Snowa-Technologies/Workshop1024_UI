import React, {useState, useRef, useEffect} from "react";
import {Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid, 
    Link, Button, FormControlLabel, RadioGroup, Radio} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { addPromotion, resetPromotion, getCampaignNames } from "../../store/actions/promotion-action";
import { Alert, Stack } from '@mui/material';

function NewPromotion(){

    const [promotionData, setPromotionData] = useState({p_nm : '', c_id : "", discount : "", promo : "", 
        start_dt : null, end_dt : null, desc : '', d_type : ''});
    const [checkError, setCheckError] = useState(false);
    const [submited, setSubmited] = useState(false);
    const fetchOnce = useRef(false)
    
    //Get result of add promotion data from store
    const dispatch = useDispatch();
    const errorStatus = useSelector(state => state.addPromotionReducer.generalError);
    const addPromotionResult = useSelector(state => state.addPromotionReducer.newPromotion);
    const campaignNames = useSelector(state => state.campaignNamesReducer.campaignNames);

    //States for showing success and failure alerts
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if(!fetchOnce.current) {
            dispatch(getCampaignNames());
            fetchOnce.current = true;
        }
    },[dispatch])

    useEffect(() => { //Handle add promotion response
        if (submited && errorStatus !== "") {
            setAlertMessage(errorStatus);
            setAlertSeverity("error");
            setShowAlert(true);
            setTimeout(() => {
                dispatch(resetPromotion());
                setSubmited(false);
                setShowAlert(false);
            }, 3000); 
        } 
        else if (submited && Object.keys(addPromotionResult).length > 0) {
            setAlertMessage(addPromotionResult.message);
            setAlertSeverity('success');
            setShowAlert(true);
            setTimeout(() => {
                setSubmited(false);
                resetForm(); 
                setShowAlert(false);
            }, 3000); 
       }
    }, [addPromotionResult, errorStatus]);

    const hideAlert = () => { //Handle alert
        setShowAlert(false);
    };

    const resetForm = () => { //Reset form fields
        setPromotionData({p_nm : '', c_id : "", discount : "", promo : "", 
                start_dt : null, end_dt : null, desc : '', d_type : ''});
        setCheckError(false);
    }

    const textFieldChange = (e) => { //Handle input field change
        const {name, value} = e.target;
        if(name === "c_id") {
            for(const item of campaignNames) {
                if(item.c_id === value) {
                    setPromotionData((prevSate) => ({...prevSate, [name]: value, c_nm : item.c_nm}));
                    return;
                }
            }
        }
        else{
            setPromotionData((prevSate) => ({...prevSate, [name]: value}));
        }
    }

    const validateFields = () => {
        for(const item of Object.keys(promotionData)) {
            if(item === "d_type") {
                if(!promotionData[item]) {
                    setAlertMessage("Please select discount type");
                    setAlertSeverity('error');
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000); 
                    return false;
                }
                else if (promotionData[item] === "Percentage") {
                    const isValidValue = promotionData.discount > 100 ? false : true;
                    if(!isValidValue) {
                        setAlertMessage("Discount percentage not greater than 100 percentage");
                        setAlertSeverity('error');
                        setShowAlert(true);
                        setTimeout(() => {
                            setShowAlert(false);
                        }, 3000);
                        return false;
                    }
                }
            }
            else if(!promotionData[item] && item !== "desc") {
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
        dispatch(addPromotion(promotionData));
        setSubmited(true);
    }

    return (
        <Box className = "newpromotion-main">
            <Box className = "promotion-top-style">
                <Typography className = "page-title">New Promotion</Typography>
                {showAlert && ( <Stack className='alert'>  <Alert severity={alertSeverity} onClose={hideAlert}>  {alertMessage} </Alert> </Stack> )}
            </Box>
            <Box className = "fields-main-box">
                <Grid container className = "text-boxes-gap">
                    <Grid item xs = {12}>
                        <Grid container spacing = {2}>
                            <Grid item xs = {4}>
                                <TextField required = {true} fullWidth label = "Promotion Name" name = "p_nm" 
                                    className = {promotionData.p_nm === "" && checkError === true ? "error-border" : "input-text" }
                                    value = {promotionData.p_nm} onChange = {textFieldChange}/>
                            </Grid>
                            <Grid item xs = {4}>
                                <FormControl required fullWidth>
                                    <InputLabel id = "campaign">Select Campaign</InputLabel>
                                    <Select labelId = "campaign" label = "Select Campaign" value={promotionData.c_id}  required onChange={textFieldChange} 
                                        className = {promotionData.c_id === "" && checkError === true ? "error-border" : "input-text" } name = "c_id">
                                            {  campaignNames.length > 0 && campaignNames.map((item, index) => (
                                                <MenuItem key = {index} value = {item.c_id}>{item.c_nm}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {12}>
                        <Grid container spacing = {2}>
                            <Grid item xs = {8}>
                                <Box className = "radio-buttons-main">
                                    <Typography>Discount Type</Typography>
                                    <FormControl>
                                        <RadioGroup name = "d_type" value = {promotionData.d_type} onChange = {textFieldChange} row>
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
                                        className = {(!promotionData.start_dt && checkError === true) ? "error-border date-field-width" : "input-text date-field-width" }
                                        value = { promotionData["start_dt"] ? dayjs(promotionData["start_dt"], "DD/MM/YYYY") : null } required
                                            onChange={(newValue) => textFieldChange({ target: { name: "start_dt", value: newValue || null, type: 'date' } })}
                                            minDate = {dayjs()} renderInput={(params) => <TextField {...params} fullWidth />}/>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs = {4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker format ="DD/MM/YYYY" fullWidth label = "End Date"
                                        className = {(!promotionData.end_dt && checkError === true) ? "error-border date-field-width" : "input-text date-field-width" } name = "end_dt" 
                                            value = { promotionData["end_dt"] ? dayjs(promotionData["end_dt"], "DD/MM/YYYY") : null } required
                                                onChange={(newValue) => {
                                                    const endDate = newValue ? dayjs(newValue).endOf('day') : null;
                                                    textFieldChange({ target: { name: "end_dt", value: endDate || null, type: 'date' } })}
                                                }
                                                minDate = {dayjs()} renderInput={(params) => <TextField {...params} fullWidth />}/>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {8}>
                        <Grid container spacing = {2}>
                            <Grid item xs = {12}>
                                <TextField multiline = {true} rows={4} label = "Description"  value = {promotionData.desc} name = "desc" 
                                    className = "input-text" 
                                        fullWidth onChange ={textFieldChange}  /> 
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {12}>
                        <Box className = "buttons-container">
                            <Link to="/noticeboard"><Button className = "button cancel">Cancel</Button></Link>
                            <Button className = "button cancel" onClick = {resetForm}>Reset</Button>
                            <Button className = "button" onClick = {handleCreate}>Create</Button>
                            <Link to="/noticeboard" style={{ display: "none" }}></Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default NewPromotion;