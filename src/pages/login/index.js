import { React, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {loginValidationSchema} from "../../store/slices/auth/validation.js"
import "../../components/ContainForm.scss"

function LoginPage () {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(state => {
    return {
      loading : state.auth.isLoginLoading,
    }
  })

  const eye = <FontAwesomeIcon icon={faEye} />;
  const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
  const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});

  const textRef = useRef()
  const passwordRef = useRef()
  
  const onButtonLogin = () => {
    const input = textRef.current?.value
    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const phone_pattern = /0[0-9]/
    let username = ""
    let email = ""
    let phone = ""
    const password = passwordRef.current?.value

    email_pattern.test(input) ? email = input : phone_pattern.test(input) ? phone = input : username = input


    dispatch(login({ username, email, phone, password }))
  }

  const id = localStorage.getItem("id")
  
  // @redirect
  if (id !== "undefined" && id  ) {
      return <Navigate to="/" replace/>
  }

  return (
      <Formik
          initialValues={{text : "" , password : ""}}
          validationSchema={loginValidationSchema}
      >
    {({ errors, touched,isSubmitting}) => {
      return (
        <div className="container ">
          <div className="form card w-2/5 bg-base-100 shadow-xl py-4 ">
            <Form>
            <h1 >Log in</h1>
              <div className="form-row mt-5">
                <label>Username or email or phone</label>
                <Field
                  type="text"
                  name="text"
                  id="text"
                  innerRef={textRef}
                  className={
                    errors.text && touched.text ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                  }
                />
                <ErrorMessage name="text" component="span" className="error" />
              </div>

              <div className="form-row">
                <label>Password</label>
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
                      setPasswordShown({value : !passwordShown.value, field_name : "password"})
                    }}>
                      {passwordShown.value && passwordShown.field_name === "password" ? eye_slash : eye}
                  </i>
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>
              <div className="link link-hover flex justify-end" onClick={() =>{navigate("/forgot-password")}}>Forgot Password</div>

              <div>
                <button
                  type="button"
                  className="btn btn-neutral flex justify-center"
                  disabled={isSubmitting || loading}
                  onClick={onButtonLogin}
                >
                  { isSubmitting || loading ?  <span className="loading loading-spinner"></span> : null }
                  Login
                </button>
              <div/>
              
                <div className="my-15">Not a member?{' '}
                <button
                    type="button"
                    className="link link-hover "
                    onClick={()=>navigate("/register")}
                >
                    Register
                </button>
                </div>
                
              </div>
            </Form>
            <br/>
          </div>
        </div>
      );
    }}
  </Formik>
  )
}

export default LoginPage