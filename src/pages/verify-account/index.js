import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verification } from "../../store/slices/auth/slices"
import "../../components/ContainForm.scss"

function VerifyAccountPage () {    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isVerified, email } = useSelector(state => {
        return {
            email : state.auth.email,
            isVerified : state.auth.isVerified
        }
    })

    const onButtonVerify = () => {
      dispatch(verification())
    }

    if ( isVerified ) {
      return <Navigate to="/profile" replace/>
    }
   
    return (
      <div className="container">
        <h1>Verification Account</h1>
        <p> Click button bellow to verify this {email} account</p>
        <br/>
        <button
          type="button"
          className="btn btn-neutral"
          onClick={()=>{
            onButtonVerify()
            navigate("/login")
          }}
        >
          Verify My Account
        </button>
      </div>
    )
}

export default VerifyAccountPage