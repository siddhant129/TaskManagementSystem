import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";
import tmsicon from "../Images/tasks.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const userData = localStorage.getItem("data");
var data = JSON.parse(userData);
const getTeams = async (token) => {
  const grps = await axios.get(
    "https://chatappbackendservice-3o66.onrender.com/chatGrp/getUserGrps",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log("grps hmmm", grps.data.userGrps);
  localStorage.setItem("Teams", JSON.stringify(grps.data.userGrps));
  // return grps.data.userGrps;
};
export function Nav({ userName }) {
  const [display, setProfile] = useState("hidden");
  const [menu, setMenu] = useState("hidden");
  const [loading, setLoad] = useState("");

  const navigate = useNavigate();
  const userData = localStorage.getItem("data");
  var data = JSON.parse(userData);
  return (
    <>
      {loading && <Loader text={loading} />}
      <nav className="bg-homeBg sticky top-0">
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
              <div className="flex flex-shrink-0 text-1F2937 items-center font-bold text-xl">
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
                    href="/Dashboard"
                    className="text-color1 hover:bg-color2 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    onClick={async () => {
                      setLoad("Moving to teams");
                      await getTeams(data.token);
                      setLoad("");
                      navigate("/Team");
                    }}
                    className="text-color1 hover:bg-color2 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className="text-color1 hover:bg-color2 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="text-color1 hover:bg-color2 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    Calendar
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-navBg p-1 text-color2 hover:text-color1 focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              {/* <!-- Profile dropdown --> */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full h-7 w-7 text-center justify-center flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
                    }}
                  >
                    {/* <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span> */}
                    {/* <img
                      className="h-8 w-8 rounded-full"
                      src="https://cdn3.iconfinder.com/data/icons/user-interface-2133/28/_28.profile_user_button_user_avatar_male_interface_icon-512.png"
                      alt=""
                    /> */}
                    <FontAwesomeIcon
                      icon={faUser}
                      className="fa-2x text-center h-5 rounded-full"
                    />
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
                <div
                  className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${display}`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                  <a
                    href="#"
                    className="block px-4 py-2 font-bold text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Hello {userName}
                  </a>
                  <hr />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div className={`space-y-1 px-2 pb-3 pt-2 transition-all ${menu}`}>
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <a
              href="/Dashboard"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              onClick={async () => {
                setLoad(true);
                await getTeams();
                setLoad(false);
                navigate("/Team");
              }}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
