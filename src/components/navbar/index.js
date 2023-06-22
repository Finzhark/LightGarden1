import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../store/slices/auth/slices"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

export default function Navbar () {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userAvatar = <FontAwesomeIcon icon={faUser} />
	// const userAvatar = () => {
	// 	id === "undefined" || !id ? <FontAwesomeIcon icon={faUser}/> : {imgProfile}
	// }

	const { username } = useSelector(state => {
        return {
			username : state.auth.username
        }
    })
	
	const id = localStorage.getItem("id")
	const onButtonLogout = () => {
		navigate("/login")
        dispatch(logout()) 
    }

	return (
	<div className="navbar bg-base-100 my-4">
	<div className="navbar-start">
		<div className="dropdown">
		<label tabIndex={0} className="btn btn-ghost lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
		</label>
		{/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
			<li><a>Explore articles</a></li>
			<li><a onClick={() =>{navigate("/post-blog")}}>Write now</a></li>
		</ul> */}
		</div>
		<a className="link link-hover normal-case text-[28pt] font-bold" onClick={() =>{navigate("/")}}>Light Garden</a>
	</div>
	{/* <div className="navbar-center hidden lg:flex">
		<ul className="menu menu-horizontal px-1">
		<li><a>Explore articles</a></li>
		<li><a>Write now</a></li>
		</ul>
	</div> */}
  <div className="navbar-end">
			<div className="flex">
		 		{id === "undefined"  || !id   
					?""
					:
						<div className="text-[18pt] pr-5">
							Hello, <i>{username}</i>
						</div>
				}
				<div className="dropdown dropdown-end">
					<label 
						tabIndex={0} 
						className="flex flex-col btn btn-ghost btn-circle avatar placeholder"
					>
						<div className="bg-neutral-focus text-neutral-content rounded-full w-12">
							<span>{userAvatar}</span>
						</div>
					</label>
					{id === "undefined"  || !id 
						?
						<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
							<li><a className="cursor-pointer text-[13pt] font-bold" onClick={() =>{navigate("/login")}}>Login</a></li>
							<li><a className="cursor-pointer text-[13pt] font-bold" onClick={() =>{navigate("/register")}}>Register</a></li>
						</ul>
						:
						<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
							<li><a className="cursor-pointer text-[13pt] font-bold" onClick={() =>{navigate("/dashboard")}}>Dashboard</a></li>
							<li><a className="cursor-pointer text-[13pt] font-bold" onClick={() =>{navigate("/profile")}}>Profile</a></li>
							<li><a className="cursor-pointer text-[13pt] font-bold" onClick={onButtonLogout}>Logout</a></li>
						</ul>
					}
				</div>
				</div>
			</div>
  
</div>
	)
}
