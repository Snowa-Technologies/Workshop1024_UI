import React,{ useRef, useEffect }from 'react';
import { Box } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

const Recaptcha = ({setError,setCaptchaVerified,onTokenChange, refreshCaptcha, setRefreshCaptcha }) => {
  const recaptchaRef = useRef(null);
  const handleRecaptchaChange = (value) => {
      setError(false);
      setCaptchaVerified(true);
      onTokenChange(value);
  };

  useEffect( () => {
    const refreshReCAPTCHA = () => {    
      if(recaptchaRef.current) {  
        recaptchaRef.current.reset(); 
        setRefreshCaptcha(false);
        setCaptchaVerified(false);
      }  
    };
    refreshReCAPTCHA();
  }, [refreshCaptcha])
  
  return (
    <Box>
        <ReCAPTCHA ref = {recaptchaRef} onExpired = {() => setCaptchaVerified(false)} sitekey="6LcIgDIqAAAAAOSkANBJucxzsXSYdztCdVtGFK_F"  onChange={ handleRecaptchaChange } style={{ display: 'inline-block' }}  />
    </Box>
  )
}
export default Recaptcha