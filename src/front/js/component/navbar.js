import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Back to principal Page</span>
				</Link>
				<div className="ml-auto">
					<Link to="/private">
						<button className="btn btn-primary">Private</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
