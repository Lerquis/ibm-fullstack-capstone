import React from "react";
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });

    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem("username");
      sessionStorage.removeItem("username");
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...");
    } else {
      alert("The user could not be logged out.");
    }
  };

  //The default home page items are the login details panel
  let home_page_items = (
    <div class="flex gap-10">
      <a
        class="p-2 bg-black rounded-full text-white text-sm font-medium hover:!bg-gray-600"
        href="/login"
      >
        Login
      </a>
      <a class="text-sm font-medium p-2 hover:!text-gray-600" href="/register">
        Register
      </a>
    </div>
  );

  //Gets the username in the current session
  let curr_user = sessionStorage.getItem("username");

  //If the user is logged in, show the username and logout option on home page
  if (curr_user !== null && curr_user !== "") {
    home_page_items = (
      <div className="flex gap-10 items-center">
        <text className="text-sm font-medium transition-colors bg-black text-white p-2 rounded-full">
          {sessionStorage.getItem("username")}
        </text>
        <a
          className="text-sm font-medium transition-colors transition-all ease hover:!bg-black bg-white hover:transition-all hover:ease p-2 hover:text-white rounded-full"
          href="/djangoapp/logout"
          onClick={logout}
        >
          Logout
        </a>
      </div>
    );
  }

  return (
    <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div class="max-w-[90%] mx-auto grid grid-cols-[1fr_1fr_1fr] h-24 items-center justify-center">
        <div class="flex items-center">
          <a href="/" class="text-2xl font-bold text-gray-900">
            Dealership
          </a>
        </div>
        <nav class="flex items-center space-x-6 mx-auto">
          <a
            class="text-sm font-medium transition-colors transition-all ease hover:!bg-black bg-white hover:transition-all hover:ease p-2 hover:text-white rounded-full"
            href="/"
          >
            Home
          </a>
          <a
            class="text-sm font-medium transition-colors transition-all ease hover:!bg-black bg-white hover:transition-all hover:ease p-2 hover:text-white rounded-full"
            href="/about"
          >
            About us
          </a>
          <a
            class="text-sm font-medium transition-colors transition-all ease hover:!bg-black bg-white hover:transition-all hover:ease p-2 hover:text-white rounded-full"
            href="/contact"
          >
            Contact us
          </a>
        </nav>
        <div style={{ justifySelf: "flex-end" }}>{home_page_items}</div>
      </div>
    </header>
  );
};

export default Header;
