import '../css/SignUp.css'
import { Link } from "react-router-dom";

export default function SignUp(){
    return(
        <>
        <div className='screen'>
            <div className="box-signup">
                <input className="text-box" type="text" placeholder="First Name"/>
                <input className="text-box" type="text" placeholder="Last Name"/>
                <input className="text-box" type="email" placeholder="Email"/>
                <input className="text-box" type="password" placeholder="Password (must contain 8 charcaters at least)" />
                <input className="text-box" type="password" placeholder="Repeat password"/>
                <div className='buton-link'>
                    <button className='button-signup' >Sign Up</button>
                    <Link to="/signin" >Already registered?</Link>
                </div>
                
            </div>
        </div>
        </>
    )
}