import { useState } from "react";
import { LogIn } from "./LogIn";
import { Navigate, useNavigate } from "react-router-dom";
import tmsicon from "../Images/tasks.png";

const NavProp = {
  logModal: () => {},
};

export function LogInNav() {
  const [display, setProfile] = useState("hidden");
  const [menu, setMenu] = useState("hidden");
  const [logIn, setLogIn] = useState(false);
  const nevigate = useNavigate();
  function logInFn() {
    setLogIn(true);
  }
  const data = localStorage.getItem("data");

  if (data) {
    nevigate("/Dashboard");
  }

  return (
    <>
      <nav className="bg-gray-800 sticky top-0 scroll-smooth">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => {
                  console.log(menu);
                  if (menu === "hidden") {
                    setMenu("");
                  } else {
                    setMenu("hidden");
                  }
                }}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!--
              Icon when menu is closed.
  
              Menu open: "hidden", Menu closed: "block"
            --> */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--
              Icon when menu is open.
  
              Menu open: "block", Menu closed: "hidden"
            --> */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                {/* <h1 style={{ fontWeight: 700, fontSize: 20, color: "white" }}>
                  ToDo
                </h1> */}
                <img
                  className="h-8 w-auto"
                  // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  src={tmsicon}
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  <a
                    href="/#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    aria-current="page"
                  >
                    Home
                  </a>
                  <a
                    href="#About"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                type="button"
                onClick={() => {
                  nevigate("/");
                  logInFn();
                }}
                className="relative bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                {/* <span className="sr-only">Log In</span> */}
                <p>Log In</p>
              </button>

              {/* <!-- Profile dropdown --> */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex bg-gray-800 focus:ring-white focus:ring-offset-2 text-sky-600 hover:text-sky-400"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="false"
                    onClick={(e) => {
                      // console.log(e.);
                      if (display === "hidden") {
                        setProfile("");
                      } else {
                        setProfile("hidden");
                      }
                      nevigate("/SignUp");
                    }}
                  >
                    Sign Up
                  </button>
                </div>

                {/* <!--
              Dropdown menu, show/hide based on menu state.
  
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div className={`space-y-1 px-2 pb-3 pt-2 transition-all ${menu}`}>
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <a
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {logIn && (
        <LogIn
          logModal={() => {
            setLogIn(false);
          }}
          //   submitData={}
        />
      )}
    </>
  );
}
