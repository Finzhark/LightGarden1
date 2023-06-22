import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { register } from "../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema } from "../../store/slices/auth/validation.js"
import "../../components/ContainForm.scss"


const initialValuesSignUp = {
    username:"",
    email: "",
    phone:"",
    password: "",
    confirmpassword: "",
}


function RegisterPage () {

    const usernameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const passwordRef = useRef()
    const confirmpasswordRef = useRef()


    const dispatch = useDispatch()
    const navigate = useNavigate
    const { isRegisterLoading } = useSelector(state => {
        return {
            id : state.auth.id,
            isRegisterLoading : state.auth.isRegisterLoading
        }
    })
    
    const id = localStorage.getItem("id")
    
    const eye = <FontAwesomeIcon icon={faEye} />;
    const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
    const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});

    
    const onButtonRegister = () => {
        dispatch(register({
            username : usernameRef.current?.value.toString(),
            email : emailRef.current?.value.toString(),
            phone : phoneRef.current?.value.toString(),
            password : passwordRef.current?.value.toString(),
            confirmPassword : confirmpasswordRef.current?.value.toString()
        }))
    }

    // @redirect
    if (id) return <Navigate to="/" replace/>

    return (
        <Formik
            initialValues={initialValuesSignUp}
            validationSchema={registerValidationSchema}
        >
        {({ errors, touched, isSubmitting }) => {
            return (
            <div className="container ">
                <div className="form card w-4/12 bg-base-100 shadow-xl py-4 ">
                    <Form>
                    <h1>Join now!</h1>
                    <div className="form-row mt-5">
                        <label >Username</label>
                        <Field
                            type="username"
                            name="username"
                            id="username"
                            innerRef = {usernameRef}
                            className={
                                errors.username && touched.username ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                            }
                        />
                        <ErrorMessage name="username" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label >Email</label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            innerRef={emailRef}
                            className={
                                errors.email && touched.email ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                            }
                        />
                        <ErrorMessage name="email" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label >Phone</label>
                        <Field
                            type="phone"
                            name="phone"
                            id="phone"
                            innerRef={phoneRef}
                            className={
                                errors.phone && touched.phone ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                            }
                        />
                        <ErrorMessage
                            name="phone"
                            component="span"
                            className="error"
                        />
                    </div>

                    <div className="form-row">
                        <label >Password</label>
                        <div className="form-row-pass">
                        <Field
                            type={passwordShown.value && passwordShown.field_name === "password" ? "text" : "password"}
                            name="password"
                            id="password"
                            innerRef={passwordRef}
                            className={
                            errors.password && touched.password ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                            }
                        />
                        <i className="eye-password" 
                            onClick={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name : "password" })
                            }}
                            onMouseLeave={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name : "" })
                            }}
                        >
                            {passwordShown.value && passwordShown.field_name === "password" ? eye_slash : eye}
                        </i>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="span"
                            className="error"
                        />
                    </div>
                    <div className="form-row">
                        <label >Confirm Password</label>
                        <div className="form-row-pass">
                        <Field
                            type={passwordShown.value && passwordShown.field_name ==="confirm" ? "text" : "password"}
                            name="confirm"
                            id="confirm"
                            innerRef={confirmpasswordRef}
                            className={
                            errors.confirm && touched.confirm ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                            }
                        />
                        <i className="eye-password" 
                            onClick={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name : "confirm" })
                            }}
                            onMouseLeave={()=>{
                                setPasswordShown({value : !passwordShown.value, field_name : "" })
                            }}
                        >
                            {passwordShown.value && passwordShown.field_name ==="confirm" ? eye_slash : eye}
                        </i>
                        </div>
                        <ErrorMessage
                            name="confirm"
                            component="span"
                            className="error"
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-neutral"
                        disabled={isSubmitting || isRegisterLoading}
                        onClick={onButtonRegister}
                    >
                        { isSubmitting || isRegisterLoading ?  <span className="loading loading-spinner"></span> : null }
                        Register
                    </button>
                    </Form>
                </div>
            </div>
            );
        }}
        </Formik>
    )
}

export default RegisterPage