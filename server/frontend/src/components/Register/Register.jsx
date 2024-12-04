import Header from "../Header/Header";

const Register = () => {
  let register_url = window.location.origin + "/djangoapp/register";

  const register = async (e) => {
    e.preventDefault();

    const values = ["userName", "firstName", "lastName", "email", "password"];
    let body = {};

    for (let i = 0; values.length > i; i++) {
      const formValue = e.target[values[i]]?.value;
      if (!formValue) return alert("Missing Values");
      else body[values[i]] = formValue;
    }

    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      alert('User Registered!')
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered.");
    } else {
      alert("Something went wrong!");
    }
    window.location.href = window.location.origin;
  };

  return (
    <div>
      <Header />
      <div className="flex" style={{ height: "calc(100vh - 97px)" }}>
        {/* Imagen del concesionario (70% del ancho) */}
        <div className="hidden lg:block lg:w-[70%] relative">
          <img
            src="/static/contactus.jpg"
            alt="Luxury cars"
            className="object-cover w-full h-full brightness-[30%]"
          />
        </div>

        {/* Formulario de inicio de sesión (30% del ancho) */}
        <div className="w-full lg:w-[30%] flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-black">Register</h2>
              <p className="mt-2 text-sm text-gray-600">
                Register your Dealership Account
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={register}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="userName" className="sr-only">
                    Username
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="userName"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="firstName"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div></div>

                <div className="text-sm">
                  <a
                    href="/login"
                    className="font-medium text-gray-600 hover:text-black"
                  >
                    Log In
                  </a>
                </div>
              </div>

              <div>
                <button
                  value="login"
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md group hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
