import "./Auth.css"
import { validateNumber, validatePassword } from "../../utils"
import { useAuth } from "../../context"
import { loginHandler } from "../../services";


let isNumberValid, isPasswordValid;

export const AuthLogin = () => {

    const { number, password, authDispatch } = useAuth(); 
    

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(isNumberValid && isPasswordValid) {
            const { accessToken, username } = await loginHandler(number, password);
            authDispatch({
                type: "SET_ACCESS_TOKEN",
                payload: accessToken
            });
            authDispatch({
                type: "SET_USER_NAME",
                payload: username
            })
        }
        
        authDispatch({
            type: "SHOW_AUTH_MODAL"
        })
    }

    const handleTestCredentialsClick = async () => {
        const { accessToken, username } = await loginHandler(7777777777, "Abhay@123");
        authDispatch({
            type: "SET_ACCESS_TOKEN",
            payload: accessToken
        });
        authDispatch({
            type: "SET_USER_NAME",
            payload: username
        });
        authDispatch({
            type: "CLEAR_USER_DATA"
        })
        authDispatch({
            type: "SHOW_AUTH_MODAL"
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
                    <label className="auth-label">Password <span className="asterisk">*</span> </label>
                    <input className="auth-input" type="password" defaultValue={password} placeholder="Enter Password" required onChange={handlePasswordChange} />
                </div>
                <div>
                    <button className="button btn-primary btn-login cursor">Login</button>
                </div>
            </form>
            <div className="cta">
                <button className="button btn-outline-primary cursor-pointer" onClick={handleTestCredentialsClick}>Login With Test Credentials</button>
            </div>
        </div>
    )
}