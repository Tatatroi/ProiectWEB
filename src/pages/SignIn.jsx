import '../css/SignUp.css';
import { Link } from "react-router-dom";

export default function SignIn(){
    return(
        <>
        <div className='screen'>
            <div className="box-signup">
                <input className="text-box" type="email" placeholder="Email"/>
                <input className="text-box" type="password" placeholder="Password (must contain 8 charcaters at least)" />
                <div className='buton-link'>
                    <button className='button-signup' >Sign In</button>
                    <Link to="/signup" >Don't have an account yet?</Link>
                </div>
                
            </div>
        </div>
        </>
    )
}