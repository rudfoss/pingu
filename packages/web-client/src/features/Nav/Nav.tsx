import React from "react"
import { NavLink } from "react-router-dom"

export const Nav = () => (
	<>
		<NavLink to="/" exact>
			Home
		</NavLink>
		<NavLink to="/post">Posts</NavLink>
		<NavLink to="/post/1">Post 1</NavLink>
		<NavLink to="/post/2">Post 2</NavLink>
		<NavLink to="/async">Async</NavLink>
		<NavLink to="/env">Env</NavLink>
	</>
)

export default Nav
