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
  const [newCampaign, setNewCampaign] = useState({});

  // State to handle validation errors
  const [validationErrors, setValidationErrors] = useState({});

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
  }, [addCampaign, errorStatus]);

  const handleChange = (event) => {
    const { name, value} = event.target;
    setNewCampaign((prevState) => ({ ...prevState, [name]: value }));

    setValidationErrors((prevErrors) => { // Remove any existing validation error for the field
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
  };
 // Handle changes in date fields
  const handleDateChange = (name, newValue) => {
    setNewCampaign((prevState) => ({ ...prevState, [name]: newValue }));

    setValidationErrors((prevErrors) => { // Remove any existing validation error for the field
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
  };
  // Reset the form by clearing all input fields and errors
  const resetForm = () => { 
    setNewCampaign((prevState) => 
    Object.keys(prevState).reduce((acc,key) => {
      acc[key] = ""
      return acc;
      },{})
    );
    setValidationErrors({});
    setAlertMessage('');
    setShowAlert(false);
  };
  // Display alert message with a specified severity level
  const showAlertMessage = (message, severity = 'info', timeout = 5000) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, timeout)
  };
  // Hide alert message manually
  const hideAlert = () => {
    setShowAlert(false);
  };

  // Validate the form by checking if required fields are filled
  const validateForm = () => {
    const errors = {};
    const requiredFields = ['c_nm', 'start_dt', 'end_dt']; // Fields that are required

    requiredFields.forEach((field) => {
      if (!newCampaign[field]) {
        errors[field] = true;
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = () => {
    if(validateForm()) {
        dispatch(addNewCampaign(newCampaign)); // Dispatch the action to add the new campaign if validation passes
        setSubmited(true);
    }else {
        showAlertMessage("Please fill all required fields", "error"); // Show error alert if validation fails
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
                  <TextField  type="text"  label="Campaign Name" name="c_nm" value={newCampaign["c_nm"] || ""}   onChange={handleChange}  className={ validationErrors["c_nm"] ? "error-Validation" : "text-box"}  fullWidth required />
                </Grid>
              </Grid>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                label="Start Date"  value={newCampaign["start_dt"] ? dayjs(newCampaign["start_dt"], "DD/MM/YYYY") : null}  required
                onChange={(newValue) => handleDateChange('start_dt', newValue)}  minDate = {dayjs()}
                renderInput={(params) => <TextField {...params} fullWidth  className={ validationErrors["start_dt"] ? "error-Validation" : "text-box"} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                label="End Date"  value={newCampaign["end_dt"] ? dayjs(newCampaign["end_dt"], "DD/MM/YYYY") : null} required 
                onChange={(newValue) => {
                  const endDate = newValue ? dayjs(newValue).endOf('day') : null;
                  handleDateChange('end_dt', endDate); 
                }} minDate = {dayjs()}
                renderInput={(params) => <TextField {...params} fullWidth className={ validationErrors["end_dt"] ? "error-Validation" : "text-box"} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={8}>
              <TextField  type="text"  label="Description" name="desc" value={newCampaign["desc"] || ""} onChange={handleChange}  className={ validationErrors["desc"] ? "error-Validation" : "text-box"}  fullWidth />
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
