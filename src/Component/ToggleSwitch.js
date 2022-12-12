import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ label }) => {
	return (
		<div className="container" style={{
			display: "flex",
			justifyContent: "space-between",
			width: "130px",
			alignItems: "center",

		}}>
			<div style={{ fontSize: "20px", paddingTop: "15px" }}>{label}
			</div>
			<div className="toggle-switch">
				<input type="checkbox" className="checkbox"
					name={label} id={label} />
				<label className="label" htmlFor={label} >
					<span className="inner" />
					<span className="switch" />
				</label>
			</div>
		</div>
	);
};

export default ToggleSwitch;
