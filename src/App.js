import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { ZoomMtg } from "@zoomus/websdk";
import Login from "./components/Login";
import Meeting from "./components/Meeting";
import Home from "./components/Home";
import ProtectedRoute from "./Layout/ProtectedRoute";
import { ProvideAuth } from "./lib/AuthProvider/ProvideAuth";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.7.0/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function App() {
	// setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
	var signatureEndpoint = "http://localhost:4000";
	// This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
	var sdkKey = "UIir8INHAEIBstbKJh9MXPIMLgo06am1QbaW";
	var leaveUrl = "http://localhost:3000";
	var userName = "React";
	var userEmail = "";
	var passWord = "4u2duX";
	// pass in the registrant's token if your meeting or webinar requires registration. More info here:
	// Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
	// Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
	var registrantToken = "";

	function getSignature({ meetingNumber, role }) {
		console.log(meetingNumber, role);
		fetch(signatureEndpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				meetingNumber: meetingNumber,
				role: role,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				startMeeting(response.signature, meetingNumber);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function startMeeting(signature, meetingNumber) {
		document.getElementById("zmmtg-root").style.display = "block";
		console.log(signature, meetingNumber);
		ZoomMtg.init({
			leaveUrl: leaveUrl,
			success: (success) => {
				console.log(success);

				ZoomMtg.join({
					signature: signature,
					meetingNumber: meetingNumber,
					userName: userName,
					sdkKey: sdkKey,
					userEmail: userEmail,
					passWord: passWord,
					tk: registrantToken,
					success: (success) => {
						console.log(success);
					},
					error: (error) => {
						console.log(error);
					},
				});
			},
			error: (error) => {
				console.log(error);
			},
		});
	}

	return (
		<ProvideAuth>
			<Router>
				<div className='App'>
					<main>
						<Switch>
							<Route path='/login'>
								<Login />
							</Route>
							<ProtectedRoute path='/meeting/:meetingId'>
								<Meeting getSignature={getSignature} />
							</ProtectedRoute>
							<Route path='/' exact>
								<Home getSignature={getSignature} />
							</Route>
						</Switch>
					</main>
				</div>
			</Router>
		</ProvideAuth>
	);
}

export default App;
