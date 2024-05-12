import { useEffect, useState } from "react";
import { Nav } from "./NavBar";
import { Folders } from "./Folders";
export function Dashboard() {
  const userData = localStorage.getItem("data");
  var data = JSON.parse(userData);
  console.log("UserData", data);
  if (data) {
    return (
      <>
        <Nav userName={data.userName} />

        {/* <h1 className="header">Welcome {data.userName}</h1> */}
        <Folders></Folders>
      </>
    );
  } else {
    return (
      <>
        <div className="flex align-center justify-center ">
          <h2 className="font-bold">404 Page not found :(</h2>
        </div>
      </>
    );
  }
}
