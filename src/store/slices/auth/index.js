import { createSlice } from "@reduxjs/toolkit";

import {
    login,
    logout,
    keepLogin,
    register,
    verification,
    forgot,
    reset_password,
    changeUsername,
    changePhone,
    changeEmail,
    changePass,
    uploadProfilePic
} from "./slices"

const INITIAL_STATE = {
    email: "",
    phone : "",
    imgProfile : null,
    isVerified : false,
    isLogin : false,
    isResetPasswordLoading : false,
    isRegisterLoading : false,
    isLoginLoading : false,
    isKeepLoginLoading : false,
    isForgotLoading : false,
    isUpdateProfilePicLoading : false,
    isUpdateProfileDetails : false,
    isLogoutLoading : false,
}

// @create slice
const authSlice = createSlice({
    name : "auth",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [login.pending] : (state, action) => {
            state.isLoginLoading = true
        },
        [login.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                id : action.payload?.id,
                username : action.payload?.username,
                email : action.payload?.email,
                phone : action.payload?.phone,
                imgProfile : action.payload?.imgProfile,
                isVerified : action.payload?.isVerified,
                isLogin : true,
                isLoginLoading : false,
            })
        },
        [login.rejected] : (state, action) => {
            state = Object.assign(state, {
                isLoginLoading : false,
                isLogin : false,
            })
        },
        [logout.pending] : (state, action) => {
            state.isLogoutLoading = true
        },
        [logout.fulfilled] : (state, action) => {
            state = Object.assign(state, INITIAL_STATE)         
        },
        [logout.rejected] : (state, action) => {
            state.isLogoutLoading = false
        },
        [keepLogin.pending] : (state, action) => {
            state.isKeepLoginLoading = true
        },
        [keepLogin.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                id : action.payload?.id,
                username : action.payload?.username,
                email : action.payload?.email,
                phone : action.payload?.phone,
                password : action.payload?.password,
                imgProfile : action.payload?.imgProfile,
                isVerified : action.payload?.isVerified,
                isLogin : true,
                isKeepLoginLoading : false,
            })
        },
        [keepLogin.rejected] : (state, action) => {
            state = Object.assign(state, {
                isKeepLoginLoading : false,
                isLogin : false,
            })
        },
        [register.pending] : (state, action) => {
            state.isRegisterLoading = true
        },
        [register.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                id : action.payload?.id,
                username : action.payload?.username,
                email : action.payload?.email,
                phone : action.payload?.phone,
                isVerified : false,
                isKeepLoginLoading : false,
                isRegisterLoading : false,
            })
        },
        [register.rejected] : (state, action) => {
            state = Object.assign(state, {
                isRegisterLoading : false,
                isLogin : false,
            })
        },
        [verification.pending] : (state, action) => {
            state.isRegisterLoading = true
        },
        [verification.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isRegisterLoading : false,
                isVerified : true,
                isLogin : false,
            })
        },
        [verification.rejected] : (state, action) => {
            state = Object.assign(state, {
                isRegisterLoading : false,
                isVerified : false,
                isLogin : false,
            })
        },
        [forgot.pending] : (state, action) => {
            state.isForgotLoading = true
        },
        [forgot.fulfilled] : (state, action) => {
            state.isForgotLoading = false
        },
        [forgot.rejected] : (state, action) => {
            state.isForgotLoading = false
        },
        [reset_password.pending] : (state, action) => {
            state.isResetPasswordLoading = true
        },
        [reset_password.fulfilled] : (state, action) => {
            state.isResetPasswordLoading = false
        },
        [reset_password.rejected] : (state, action) => {
            state.isResetPasswordLoading = false
        },
        [changeUsername.pending] : (state, action) => {
            state.isUpdateProfileDetails = true
        },
        [changeUsername.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isUpdateProfileDetails : false,
                username : action.payload.newUsername,
            })
        },
        [changeUsername.rejected] : (state, action) => {
            state.isUpdateProfileDetails = false
        },
        [changeEmail.pending] : (state, action) => {
            state.isUpdateProfileDetails = true
        },
        [changeEmail.fulfilled] : (state, action) => {
            state.isUpdateProfileDetails = false
        },
        [changeEmail.rejected] : (state, action) => {
            state.isUpdateProfileDetails = false
        },
        [changePhone.pending] : (state, action) => {
            state.isUpdateProfileDetails = true
        },
        [changePhone.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isUpdateProfileDetails : false,
                phone : action.payload.newPhone,
            })
        },
        [changePhone.rejected] : (state, action) => {
            state.isUpdateProfileDetails = false
            
        },
        [changePass.pending] : (state, action) => {
            state.isResetPassword = false
        },
        [changePass.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                id : "",
                username : "",
                email : "",
                phone : "",
                password: "",
                imgProfile : "",
                isResetPassword : true,
                isLogin : false
            })
        },
        [changePass.rejected] : (state, action) => {
            state.isResetPassword = false
        },
        [uploadProfilePic.pending] : (state, action) => {
            state = Object.assign(state, {
                isUpdateProfilePicLoading : true,
                imgProfile : null
            })
        },
        [uploadProfilePic.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                sisUpdateProfilePicLoading : false,
                imgProfile : action.payload.imgProfile
            })
        },
        [uploadProfilePic.rejected] : (state, action) => {
            state.isUpdateProfilePicLoading = false
        }

        
    }
})

// export reducer
export default authSlice.reducer
