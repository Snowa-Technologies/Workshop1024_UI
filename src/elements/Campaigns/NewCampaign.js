import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCampaign, resetNewCampaign } from '../../store/actions/campaign-action';
import { useNavigate } from 'react-router-dom';

const Campaign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to store newCampaign form data
  const [newCampaign, setNewCampaign] = useState({ c_nm : '', start_dt : '', end_dt : '', desc : ''});
  const [checkError, setCheckError] = useState(false); 

  // States to manage alert messages
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [showAlert, setShowAlert] = useState(false);

  // State to track if the form was submitted
  const [submited, setSubmited] = useState(false);

  // Selector to fetch the campaign addition response and error status from Redux store
  const addCampaign = useSelector(state => state.addNewCampaignReducer.newCampaign)
  const errorStatus = useSelector(state => state.addNewCampaignReducer.generalError);

  useEffect(() => {
    if (submited && errorStatus !== "") {
       showAlertMessage(errorStatus, 'error');
    } else if (submited && Object.keys(addCampaign).length > 0) {
      showAlertMessage(addCampaign.message, 'success');
      setTimeout(() => { // Reset form and state after successful submission
          dispatch(resetNewCampaign());
          setSubmited(false);
          resetForm(); 
        }, 2000); 
    }
  }, [dispatch, addCampaign, errorStatus]);

  const handleChange = (event) => {
    const { name, value} = event.target;
    setNewCampaign((prevState) => ({ ...prevState, [name]: value }));
  };
  // Handle changes in date fields
  const handleDateChange = (name, newValue) => {
    setNewCampaign((prevState) => ({ ...prevState, [name]: newValue }));
  };
  // Reset the form by clearing all input fields and errors
  const resetForm = () => { 
    setNewCampaign({ c_nm : '', start_dt : '', end_dt : '', desc : ''});
    setAlertMessage('');
    setShowAlert(false);
    setCheckError(false);
  };
  // Display alert message with a specified severity level
  const showAlertMessage = (message, severity = 'info', timeout = 5000) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
  };
  // Hide alert message manually
  const hideAlert = () => {
    setShowAlert(false);
  };
  // Validate the form by checking if required fields are filled
  const validateForm = () => {
    const requiredFields = ['c_nm', 'start_dt', 'end_dt']; // Fields that are required

    for(const field of requiredFields) {
      if(!newCampaign[field]) {
        setCheckError(true);
        return false;
      }
    }
    return true;
  };
  // Handle form submission
  const handleSubmit = () => {
    if(validateForm()) {
        dispatch(addNewCampaign(newCampaign)); // Dispatch the action to add the new campaign if validation passes
        setSubmited(true);
    }else {
        showAlertMessage("Please fill all required fields", "error"); // Show error alert if validation fails
        return; 
    }
  };
  return (
    <Box className="new-campaign">
      <Box className="header-container">
        <Typography className="page-title">New Campaign</Typography>
        {showAlert && ( <Stack className='alert'>  <Alert severity={alertSeverity} onClose={hideAlert}>  {alertMessage} </Alert>  </Stack> )}
      </Box>
      <Box className = "form-container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField  type="text"  label="Campaign Name" name="c_nm" value={newCampaign["c_nm"] || ""}   onChange={handleChange}  className={ ( newCampaign.c_nm === "" && checkError ) ? "error-Validation" : "text-box"}  fullWidth required />
                </Grid>
              </Grid>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker fullWidth
                label="Start Date"  value={newCampaign["start_dt"] ? dayjs(newCampaign["start_dt"], "DD/MM/YYYY") : null}  required className={( !newCampaign.start_dt && checkError ) ? "error-Validation datefield-width" : "text-box datefield-width"}
                onChange={(newValue) => handleDateChange('start_dt', newValue)}  minDate = {dayjs()} 
                renderInput={(params) => <TextField {...params} fullWidth  />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                label="End Date"  value={newCampaign["end_dt"] ? dayjs(newCampaign["end_dt"], "DD/MM/YYYY") : null} required
                 className={ ( !newCampaign.end_dt && checkError ) ? "error-Validation datefield-width" : "text-box datefield-width"} 
                onChange={(newValue) => {
                  const endDate = newValue ? dayjs(newValue).endOf('day') : null;
                  handleDateChange('end_dt', endDate); 
                }} minDate = {dayjs()}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={8}>
              <TextField  type="text"  label="Description" name="desc" value={newCampaign["desc"] || ""} onChange={handleChange}  className="text-box"  fullWidth />
          </Grid>
        </Grid>
        <Box className="actions-buttons">
          <Button type='button' className='cancel' onClick={() => navigate('/campaigns')} >Cancel</Button>
          <Button type='button' className='cancel' onClick={resetForm} >Reset</Button>
          <Button type='submit' className='add' onClick={handleSubmit}>Save</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
