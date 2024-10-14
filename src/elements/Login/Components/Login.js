import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import Recaptcha from './Recaptcha';
import { getUserAuthentication, resetAuthData } from '../../../store/actions/auth-action'

const Login = () => {
    // const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("")
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [ctoken,setCaptchaToken] = useState("");
    const [refreshCaptcha, setRefreshCaptcha] = useState(false);
    const [error, setError] = useState(false);
    const [dataError, setDataError] = useState(false);
    const [validError,setValidError] = useState(false);

    const authUserDataError = useSelector(state => state.authUserDataReducer.generalError);
    const dispatch = useDispatch();


    /** Handling UserName */
    const handleChangeUserName = (e) => {
        setUserName(e.target.value)
    }
    /** Handling Password */
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    /** Handling Recaptcha */
    const handleTokenChange = (newToken) => {
        setCaptchaToken(newToken);
    };

    /** Handle submit form  */
    const handleSubmit = () => {
         //Reset error message if any 
         dispatch(resetAuthData());
        //Validating admission no
        if (!userName || !password) {
            setValidError(true);
            return;
        }
        //Validating tick of recaptcha
        // if (!captchaVerified) {
        //     setError(true);
        //     return;
        // }
        if(userName && password) {
            const reqBody = {username : userName.toLowerCase(), password : password, captchatoken : ctoken};
            dispatch(getUserAuthentication(reqBody));
            setDataError(true);
        }
    }

    useEffect(() => {
        if (authUserDataError && dataError) {
            // handle response only when both errors are present
            handleResponse();
        }
    }, [authUserDataError, dataError, dispatch]);

     /** Handle API response  */
     const handleResponse = () => {
        if(authUserDataError === "success") {
            dispatch(resetAuthData());
            setValidError(false);
            setDataError(false);
        }
        else{
            setDataError(false);
            setValidError(true);
            setRefreshCaptcha(true);  
        }
    }

    return (
        <Box className="login-entry-details">
            <Box>
                <Typography className="login-title">Login</Typography>
                <Typography className="sub-title">Login with your username and password</Typography>
            </Box>
            <TextField label="Username" value={userName} onChange={handleChangeUserName} className={(!userName && validError) ? "validation-border" : "text"}  variant="outlined"   inputProps={{ maxLength: 20 }}  InputLabelProps={{ className: "input-label" }}
            />
            <TextField label="Password" value={password} onChange={handleChangePassword} className={(!password && validError) ? "validation-border" : "text"} InputLabelProps={{ className: "input-label" }} inputProps={{ maxLength: 20 }}
            />
            <Recaptcha setError={setError} setCaptchaVerified={setCaptchaVerified} onTokenChange={handleTokenChange} setRefreshCaptcha = {setRefreshCaptcha} refreshCaptcha = {refreshCaptcha} />
            <Box className="validation-error-box">
                {(validError && (!userName || !password)) ? (
                <Typography className='validtion-error'>Please fill required details</Typography>
                ): null}
                {validError ? (
                <Typography className='validtion-error'>{authUserDataError}</Typography>
                ): null}
                {error ? (
                <Typography className='validtion-error'>Please complete the reCAPTCHA verification</Typography>
                ) : null}
            </Box>
            <Typography className="forgot-password">Forgot Password?</Typography>
            <Box className="login-button-box">
                <Button className="button" onClick={handleSubmit}>GO</Button>
            </Box>
       </Box>
    );
};

export default Login;
