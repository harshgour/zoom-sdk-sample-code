import React, { createContext, useContext } from "react";

const fakeAuth = {
	isAuthenticated: false,
	signin(cb) {
		fakeAuth.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		fakeAuth.isAuthenticated = false;
		setTimeout(cb, 100);
	},
};

const authContext = createContext();

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
	return useContext(authContext);
}

export function useProvideAuth() {
	const [user, setUser] = React.useState(
		JSON.parse(localStorage.getItem("zoom_user"))?.email,
	);

	const signin = (formData, cb) => {
		return fakeAuth.signin(() => {
			localStorage.setItem("zoom_user", JSON.stringify(formData));
			setUser(formData.email);
			cb();
		});
	};

	const signout = (cb) => {
		return fakeAuth.signout(() => {
			localStorage.removeItem("zoom_user");
			setUser(null);
			cb();
		});
	};

	return {
		user,
		signin,
		signout,
	};
}
