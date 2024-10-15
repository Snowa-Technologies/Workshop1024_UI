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

  const [campaign, setCampaign] = useState({});

  const [validationErrors, setValidationErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [showAlert, setShowAlert] = useState(false);
  const [submited, setSubmited] = useState(false);

  const addCampaign = useSelector(state => state.addNewCampaignReducer.newCampaign)
  const errorStatus = useSelector(state => state.addNewCampaignReducer.generalError);

  useEffect(() => {
    if (submited && errorStatus !== "") {
       showAlertMessage(errorStatus, 'error');
    } else if (submited && Object.keys(addCampaign).length > 0) {
       showAlertMessage(addCampaign.message, 'success');
       setTimeout(() => {
           dispatch(resetNewCampaign());
           setSubmited(false);
           resetForm(); 
         }, 2000); 
   }
  }, [addCampaign, errorStatus]);

  const handleChange = (event) => {
    const { name, value} = event.target;
    setCampaign((prevState) => ({ ...prevState, [name]: value }));

    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleDateChange = (name, newValue) => {
    setCampaign((prevState) => ({ ...prevState, [name]: newValue }));
    setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
  };
  const resetForm = () => {
    setCampaign((prevState) => 
    Object.keys(prevState).reduce((acc,key) => {
      acc[key] = ""
      return acc;
      },{})
    );
    setValidationErrors({});
    setAlertMessage('');
    setShowAlert(false);
  };
  const showAlertMessage = (message, severity = 'info', timeout = 5000) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, timeout)
  };
  const hideAlert = () => {
    setShowAlert(false);
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['c_nm', 'start_dt', 'end_dt']; // Fields that are required

    requiredFields.forEach((field) => {
      if (!campaign[field]) {
        errors[field] = true;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if(validateForm()) {
        dispatch(addNewCampaign(campaign));
        setSubmited(true);

    }else {
        showAlertMessage("Please fill all required fields", "error");
    }
  }

  return (
    <Box className="campaign-main">
      <Typography className="title">New Campaign</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField  type="text"  label="Campaign Name" name="c_nm" value={campaign["c_nm"] || ""}   onChange={handleChange}  className={ validationErrors["c_nm"] ? "error-Validation" : "text-box"}  fullWidth required />
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              label="Start Date"  value={campaign["start_dt"] ? dayjs(campaign["start_dt"], "DD/MM/YYYY") : null}  required
              onChange={(newValue) => handleDateChange('start_dt', newValue)}  minDate = {dayjs()}
              renderInput={(params) => <TextField {...params} fullWidth  sx={{ width: "385px" }} className={ validationErrors["start_dt"] ? "error-Validation" : "text-box"} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              label="End Date"  value={campaign["end_dt"] ? dayjs(campaign["end_dt"], "DD/MM/YYYY") : null} required 
              onChange={(newValue) => {
                const endDate = newValue ? dayjs(newValue).endOf('day') : null;
                handleDateChange('end_dt', endDate); // Fixed key from 'start_dt' to 'end_dt'
              }} minDate = {dayjs()}
              renderInput={(params) => <TextField {...params} fullWidth className={ validationErrors["end_dt"] ? "error-Validation" : "text-box"} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={8}>
            <TextField  type="text"  label="Description" name="desc" value={campaign["desc"] || ""} onChange={handleChange}  className={ validationErrors["desc"] ? "error-Validation" : "text-box"}  fullWidth />
            </Grid>
      </Grid>
      <Box className="buttons-container">
            <Box className="all-buttons">
               <Button type='button' className='cancel-button' onClick={() => navigate('/campaigns')} >Cancel</Button>
                <Button type='button' className='cancel-button' onClick={resetForm} >Reset</Button>
                <Button type='submit' className='add-button' onClick={handleSubmit}>Save</Button>
            </Box>
            {showAlert && ( <Stack className='alert'>  <Alert severity={alertSeverity} onClose={hideAlert}>  {alertMessage} </Alert>  </Stack> )}
     </Box>
    </Box>
  );
};

export default Campaign;
