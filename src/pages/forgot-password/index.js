import { useRef } from "react"
import { useDispatch,useSelector } from "react-redux"
import { forgot } from "../../store/slices/auth/slices"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { forgotValidationSchema } from "../../store/slices/auth/validation.js"
import "../../components/ContainForm.scss"

function ForgotPasswordPage () {
    const dispatch = useDispatch()
    const { isForgotLoading } = useSelector(state => {
        return {
          isForgotLoading : state.auth.isForgotLoading,
        }
    })

    const emailRef = useRef()

    const onButtonSendLink = () => {
        const email = emailRef.current?.value.toString()
        dispatch(forgot({ email }))
    }

    return (
        <Formik
            initialValues={{email: ""}}
            validationSchema={forgotValidationSchema}
        >
      {({ errors, touched, isSubmitting}) => {
        return (
          <div className="container">
            <div className="form card w-4/12 bg-base-100 shadow-xl py-4">
              <Form>
                <h1>Forgot Password</h1>
                <div className="form-row mt-7">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    innerRef={emailRef}
                    className={
                      errors.email && touched.email ? "input-error input input-md w-full" : "input input-bordered input-md w-full"
                    }
                  />
                  <ErrorMessage name="email" component="span" className="error" />
                </div>
                <button
                  type="button"
                  className={
                    `btn btn-neutral 
                    ${(emailRef.current?.value === "")
                        ? "btn-disabled btn-ghost" 
                        : ""
                    }
                    `
                } 
                  disabled={isSubmitting || isForgotLoading}
                  onClick={onButtonSendLink}
                >
                  { isSubmitting || isForgotLoading ?  <span className="loading loading-spinner"></span> : null }
                  Send Link Reset Password 
                </button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
    )
}

export default ForgotPasswordPage