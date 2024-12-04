import "./Auth.css";
import { useAuth } from "../../context";
import { validateName, validateNumber, validatePassword, validateEmail } from "../../utils";
import { signupHandler } from "../../services";


let isNumberValid, isNameValid, isEmailValid, isPasswordValid, isConfirmPasswordValid;

export const AuthSignup = () => {
    const { username, password, confirmPassword, email, number, authDispatch } = useAuth();

    const handleNumberChange = (event) => {
        isNumberValid = validateNumber(event.target.value);
        if(isNumberValid) {
            authDispatch({
                type: "NUMBER",
                payload: event.target.value
            })
        }else {
            console.log("Invalid Number");
        }
    };

    const handleNameChange = (event) => {
        isNameValid = validateName(event.target.value);
        if(isNameValid) {
            authDispatch({
                type: "NAME",
                payload: event.target.value
            })
        }else {
            console.log("Invalid Name");
        }
    };

    const handleEmailChange = (event) => {
        isEmailValid = validateEmail(event.target.value);
        if(isEmailValid) {
            authDispatch({
                type: "EMAIL",
                payload: event.target.value
            })
        }else {
            console.log("Invalid Email");
        }
    };

    const handlePasswordChange = (event) => {
        isPasswordValid = validatePassword(event.target.value);
        console.log({  })
        if(isPasswordValid) {
            authDispatch({
                type: "PASSWORD",
                payload: event.target.value
            })
        }else {
            console.log("Invalid Password");
        }
    };

    const handleConfirmPasswordChange = (event) => {
        isConfirmPasswordValid = validatePassword(event.target.value);
        if(isConfirmPasswordValid){
            authDispatch({
                type: "CONFIRM_PASSWORD",
                payload: event.target.value
            })
        }else {
            console.log("Invalid Confirm Password")
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if(isNumberValid && isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            signupHandler(username, number, email, password)
        }
        authDispatch({
            type: "CLEAR_USER_DATA"
        })
        authDispatch({
            type: "SET_TO_LOGIN"
        })
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleFormSubmit}>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Mobile Number <span className="asterisk">*</span> </label>
                    <input className="auth-input" type="number" defaultValue={number} maxLength="10" placeholder="Enter Mobile Number" required onChange={handleNumberChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Name <span className="asterisk">*</span> </label>
                    <input className="auth-input" type="text" defaultValue={username} placeholder="Enter Name" required onChange={handleNameChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Email <span className="asterisk">*</span> </label>
                    <input className="auth-input" type="email" defaultValue={email} placeholder="Enter Email" required onChange={handleEmailChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Password <span className="asterisk">*</span> </label>
                    <input className="auth-input" type="password" defaultValue={password} placeholder="Enter Password" required onChange={handlePasswordChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Confirm Password <span className="asterisk">*</span> </label>
                    <input className="auth-input" type="password" defaultValue={confirmPassword} placeholder="Confirm Password" required onChange={handleConfirmPasswordChange} />
                </div>
                <div>
                    <button className="button btn-primary btn-login cursor">Submit</button>
                </div>
            </form>
        </div>
    )
}