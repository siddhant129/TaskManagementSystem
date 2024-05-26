import axios from "axios";
import { useState } from "react";
import { Loader } from "../Loader";

const userData = localStorage.getItem("data");
var userName;
var data = JSON.parse(userData);
if (!data) {
  userName = "";
} else {
  userName = data.userName;
}
//Function to get teams
const getTeams = async () => {
  const grps = await axios.get(
    "https://chatappbackendservice-3o66.onrender.com/chatGrp/getUserGrps",
    {
      headers: { Authorization: `Bearer ${data.token}` },
    }
  );
  console.log("grps hmmm", grps.data.userGrps);
  localStorage.setItem("Teams", JSON.stringify(grps.data.userGrps));
  // return grps.data.userGrps;
};

//Function to create new team
const addUser = async (teamName, newMember) => {
  // e.preventDefault();
  var msg;
  try {
    const newMem = await axios
      .post(
        "https://chatappbackendservice-3o66.onrender.com/chatGrp/addUser",
        {
          user: newMember,
          Name: teamName,
        },
        {
          headers: { Authorization: `Bearer ${data.token}` },
        }
      )
      .then(async (resp) => {
        const teams = await getTeams();

        try {
          msg = resp.data.message;
        } catch (error) {
          msg = resp.data;
        }
        if (typeof resp.data === String) {
          msg = resp.data;
        }
      })
      .catch((err) => {
        if (err.response.data) {
          msg = err.response.data.message;
        } else {
          msg = "User not found";
        }
      });
    if (newMem) {
      msg = "User added successfully";
    }
  } catch (error) {
    msg = "User not found";
  }
  return msg;
};

export function AddUser({ teamName, closeModal = () => {} }) {
  const [userName, setUName] = useState("");
  const [loading, setLoad] = useState("");
  return (
    <>
      {loading && <Loader text={loading} />}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-8 rounded w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Add new member</h2>
          {/* Folder name input section */}
          <label className="block text-black text-sm font-bold mb-1 align-left">
            User Name
          </label>
          <input
            placeholder="Enter user name"
            onChange={(val) => {
              setUName(val.target.value);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
          />
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            onClick={() => {
              closeModal();
            }}
          >
            Cancel
          </button>{" "}
          <button
            className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            onClick={async () => {
              setLoad("Adding new user");
              const msg = await addUser(teamName, userName);
              setLoad("");
              closeModal(msg);
              // const data = await createFolder(folderName, folderDesc);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
