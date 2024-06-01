import { Navigate, useNavigate } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { useState } from "react";
import { LogInNav } from "./LogInNav";
import axios from "axios";

const LogProp = {
  logModal: () => {},
};
export let userData;
const getUserData = async (event) => {
  event.preventDefault();
  console.log(event.target[1].value);
  console.log(event.target[2].value);

  const response = await fetch(
    "https://toodo-api.onrender.com/app/v1/users/logIn",
    {
      method: "POST",
      body: JSON.stringify({
        user: event.target[1].value,
        password: event.target[2].value,
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

const submitData = async (event) => {
  event.preventDefault();
  console.log(event.target[0].value);
  console.log(event.target[1].value);
  console.log(event.target[2].value);

  try {
    const data = await axios.post(
      "https://toodo-api.onrender.com/app/v1/users/signUp",
      {
        email: event.target[1].value,
        userName: event.target[0].value,
        password: event.target[2].value,
      }
    );

    console.log(data);
    if (data.data.success) {
      return { success: true, message: "User created successfully" };
    }
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "User name or email already exists !" };
  }

  //   event.preventDefault();
  //   console.log(event.target[0].value);
  //   console.log(event.target[1].value);

  //   const response = await fetch(
  //     "https://toodo-api.onrender.com/app/v1/users/signUp",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         emai: event.target[0].value,
  //         userName: event.target[1].value,
  //         password: event.target[2].value,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   ).catch((e) => {
  //     console.log(e.message);
  //   });
  //   const data = await response.json().catch((err) => {
  //     console.log(err.message);
  //   });

  //   if (data.success) {
  //     userData = data;
  //     console.log(userData);
  //     localStorage.setItem("data", JSON.stringify(data));
  //     return "/Dashboard";
  //   }

  //   return "/";
};
export function SignUp({ logModal } = LogProp) {
  const nevigate = useNavigate();
  const [userCreated, setUserCreated] = useState("");

  // const nevigate = useNavigate();
  const [logLoader, setSignUp] = useState("Create Account");
  const [signFailed, setFailed] = useState("");

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
                Sign up to our platform
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
            {signFailed !== "" && (
              <h3 className="text-center text-red-400">
                User or email aready exists !
              </h3>
            )}
            <div className="p-4 md:p-5">
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  setSignUp("");
                  const userCreated = await submitData(e);
                  if (userCreated.success) {
                    // setFailed(
                    //   userCreated.message || "User created successfully !"
                    // );

                    const path = await getUserData(e);
                    nevigate(path);
                    setSignUp("Create Account");
                  } else {
                    setFailed(
                      userCreated.message || "User or email already exists"
                    );
                    setSignUp("Create Account");
                  }
                }}
                action="#"
              >
                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-color2"
                  >
                    Username
                  </label>
                  <input
                    name="username"
                    id="username"
                    className="bg-inpBg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-inpBg dark:border-gray-500 dark:placeholder-gray-600 font-bold dark:text-black"
                    placeholder="Enter username"
                    // required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-color2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-inpBg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-inpBg dark:border-gray-500 dark:placeholder-gray-600 font-bold dark:text-black"
                    placeholder="Enter email"
                    // required
                  />
                </div>
                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-color2"
                  >
                    Password
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     {/* <LogInNav /> */}
  //     <div
  //       id="authentication-modal"
  //       className="flex justify-center items-center"
  //     >
  //       <div className="relative p-4 w-full max-w-md max-h-full">
  //         <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
  //           <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
  //             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
  //               Sign up to our platform
  //             </h3>
  //             <button
  //               type="button"
  //               className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
  //               data-modal-hide="authentication-modal"
  //               onClick={logModal}
  //             >
  //               <svg
  //                 className="w-3 h-3"
  //                 aria-hidden="true"
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 viewBox="0 0 14 14"
  //               >
  //                 <path
  //                   stroke="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
  //                 />
  //               </svg>
  //               <span className="sr-only">Close modal</span>
  //             </button>
  //           </div>
  //           <div className="p-4 md:p-5">
  //             <form
  //               className="space-y-4"
  //               onSubmit={async (e) => {
  //                 const path = await submitData(e);
  //                 //   nevigate(path);
  //                 setUserCreated(path);
  //               }}
  //               action="#"
  //             >
  //               <div>
  //                 <label
  //                   htmlFor="email"
  //                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //                 >
  //                   Email
  //                 </label>
  //                 <input
  //                   type="email"
  //                   name="email"
  //                   id="email"
  //                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
  //                   // placeholder="name@company.com"
  //                   required
  //                 />
  //                 <label
  //                   // htmlFor="email"
  //                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //                 >
  //                   Username
  //                 </label>
  //                 <input
  //                   // type="email"
  //                   name="uname"
  //                   id="uname"
  //                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
  //                   // placeholder="name@company.com"
  //                   required
  //                 />
  //               </div>
  //               <div>
  //                 <label
  //                   htmlFor="password"
  //                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //                 >
  //                   Your password
  //                 </label>
  //                 <input
  //                   type="password"
  //                   name="password"
  //                   id="password"
  //                   placeholder="••••••••"
  //                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
  //                   required
  //                 />
  //               </div>
  //               <button
  //                 type="submit"
  //                 onClick={() => {
  //                   console.log("On click");
  //                 }}
  //                 className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  //               >
  //                 Sign Up
  //               </button>
  //             </form>
  //             {
  //               <div className=" flex justify-center align-center ">
  //                 <p className="text-white">{userCreated}</p>
  //               </div>
  //             }
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
