import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        // console.log('form submitting')
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted, name);
        // reset error
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer.');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case characters');
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions!');
            return;
        }



        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('User Created Successfully')

                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"

                })
                .then( () => console.log('profile updated'))
                .catch()


                // send verification email
                sendEmailVerification(result.user)
                .then(() => {
                    alert('Please check your email and verify your account ')
                })

            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })
    }

    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">This is Register page..</h2>
                <form onSubmit={handleRegister} >
                    <input className="mb-4 border-2  w-3/4 py-2 px-4" placeholder="Your name" type="text" name="name" id="" required />
                    <br />
                    <input className="mb-4 border-2  w-3/4 py-2 px-4" placeholder="Email Address" type="email" name="email" id="" required />
                    <br />
                    <input
                        className="mb-4 -mr-10 border-2  w-3/4 py-2 px-4"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="" required />
                    <span className="" onClick={() => setShowPassword(!showPassword)}><button className=" text-xl py-2">
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button></span>
                    <br />
                    <div className="mb-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms"><a href="">Accept our terms and condition</a></label>
                    </div>
                    <br />
                    <input className="mb-4 border-2 btn btn-secondary w-3/4" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className=" text-3xl text-red-700">{registerError}</p>
                }
                {
                    success && <p className=" text-2xl text-green-600">{success}</p>
                }
                <p>Already have an account? Please <Link to="/login">Login</Link> </p>
            </div>
        </div>
    );
};

export default Register;