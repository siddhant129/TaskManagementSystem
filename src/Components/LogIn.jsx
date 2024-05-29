import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { spiral } from "ldrs";

import { ring2 } from "ldrs";
spiral.register();

ring2.register();

// Default values shown

const LogProp = {
  logModal: () => {},
};
export let userData;
const submitData = async (event) => {
  event.preventDefault();
  console.log(event.target[0].value);
  console.log(event.target[1].value);

  const response = await fetch(
    "https://toodo-api.onrender.com/app/v1/users/logIn",
    {
      method: "POST",
      body: JSON.stringify({
        user: event.target[0].value,
        password: event.target[1].value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((e) => {
    console.log(e);
  });
  const data = await response.json().catch((err) => {
    console.log(err.message);
  });

  if (data.success) {
    userData = data;
    localStorage.setItem("data", JSON.stringify(data));
    return "/Dashboard";
  }

  return "/";
};
export function LogIn({ logModal } = LogProp) {
  const nevigate = useNavigate();
  const [logLoader, setLogIn] = useState("Login to your account");
  const [logfailed, setFailed] = useState("");

  return (
    <>
      <div
        id="authentication-modal"
        className="fixed inset-10 rounded-t bg-opacity-0 justify-center flex items-center"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white  rounded-lg shadow dark:border-gray-600 dark:bg-gray-600">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-color1">
                Sign in to our platform
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={logModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {logfailed !== "" && (
              <h3 className="text-center text-red-400">
                Incorrect email or password
              </h3>
            )}
            <div className="p-4 md:p-5">
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  setLogIn("");
                  const path = await submitData(e);
                  if (path === "/") {
                    setFailed("Incorrect password");
                    setLogIn("Login to your account");
                  }
                  nevigate(path);
                }}
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-color2"
                  >
                    Your email or username
                  </label>
                  <input
                    // type="email"
                    name="email"
                    id="email"
                    className="bg-inpBg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-inpBg dark:border-gray-500 dark:placeholder-gray-600 font-bold dark:text-black"
                    placeholder="Enter username or mail"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-color2"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-inpBg 600 dark:border-gray-500 dark:placeholder-gray-600 font-bold dark:text-black"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  {/* <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                      />
                    </div> */}
                  {/* <label
                      htmlFor="remember"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div> */}
                  <a
                    href="#"
                    className="text-sm text-blue-700 hover:underline dark:text-color1"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  onClick={() => {
                    console.log("On click");
                  }}
                  className="w-full text-white bg-btnBg hover:bg-btnBg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-color2 dark:hover:bg-color3 dark:focus:ring-blue-800"
                >
                  {!logLoader && (
                    <l-ring-2
                      size="20"
                      stroke="5"
                      stroke-length="0.25"
                      bg-opacity="0.1"
                      speed="0.8"
                      color="black"
                    ></l-ring-2>
                  )}{" "}
                  {logLoader}
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-color1">
                  Not registered?{" "}
                  <a
                    href="#"
                    className="text-blue-700 hover:underline dark:text-color2"
                  >
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
