const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			
			registerUser: async (user) => {
				try {
				  const response = await fetch(process.env.BACKEND_URL + "api/register", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify(user),
				  });
		
				  if (response.ok) {
					console.log("Usuario registrado exitosamente");
				  } else {
					console.error("Error al registrar el usuario");
				  }
				} catch (error) {
				  console.error("Error al realizar la solicitud", error);
				}
			  },
			  isAuthenticated: (token) => {
				console.log(token);


				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": 'Bearer ' + token
					},
					body: JSON.stringify({})
				};

				fetch(process.env.BACKEND_URL + "/api/private", options)
					.then(response => {
						if (response.status === 200) {
							return response.json();
						} else {
							throw new Error("There was a problem in the login request");
						}
					})
					.then(response => {
						console.log(response)
						setStore({ storeToken: true });
					})
					.catch(error => console.log('error', error));
			},
			login: (email, password) => {
				return new Promise((resolve, reject) => {
					fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					})
						.then((response) => response.json())
						.then((data) => {
							console.log(data);
							if (data.token) {
								localStorage.setItem("token", data.token);
								localStorage.setItem("userName", data.user.name);
								localStorage.setItem("userLastName", data.user.last_name)
								localStorage.setItem("email", data.user.email);
								

								setStore({ userName: data.user.name });
								setStore({ email: data.user.email });
								setStore({ token: data.token });
								setStore({ auth: true });
								setStore({ userId: data.user.id });
								setStore({ userLastName: data.user.last_name });
							
								resolve(true);
							} else {
								console.log("Password or mail incorrect");
								resolve(false);
							}
						})
						.catch((error) => {
							console.error(error);
							reject(error);
						});
				});
			},
			signOut: () => {
				localStorage.removeItem("token");
				setStore({ auth: false })
			},
			},
		  };
		};
export default getState;
