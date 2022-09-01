import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider/ProvideAuth";

const Meeting = (props) => {
	let { meetingId } = useParams();
	let auth = useAuth();
	let history = useHistory();

	React.useEffect(() => {
		console.log(meetingId);
	});

	const handleLogout = () => {
		auth.signout(() => {
			history.push("/");
		});
	};

	return (
		<>
			<h1>Meeting</h1>
			<button
				onClick={() =>
					props.getSignature({ meetingNumber: meetingId, role: 0 })
				}
				style={{ marginBottom: "10px" }}>
				Join Meeting
			</button>
			<div
				onClick={handleLogout}
				style={{
					cursor: "pointer",
					position: "fixed",
					top: "10vh",
					right: "10vh",
				}}>
				Logout
			</div>
		</>
	);
};

export default Meeting;
