import React from "react";

const Home = (props) => {
	var meetingNumber = "98945279552";
	var role = 1;
	const copyMeetingNumber = () => {
		navigator.clipboard.writeText(meetingNumber);
	};
	return (
		<>
			<h1>Zoom Meeting SDK Integration</h1>
			<h3>
				Join default meeting as{" "}
				<span style={{ color: "#277BC0", textDecoration: "underline" }}>
					host
				</span>
				!!
			</h3>
			<h3>
				Meeting number :{" "}
				<span
					style={{ color: "#277BC0", cursor: "pointer" }}
					onClick={copyMeetingNumber}>
					{meetingNumber}
				</span>
			</h3>
			<button onClick={() => props.getSignature({ meetingNumber, role })}>
				Join Meeting
			</button>
		</>
	);
};

export default Home;
