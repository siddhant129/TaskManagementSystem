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
const createTeam = async (name) => {
  const newTeam = await axios
    .post(
      "https://chatappbackendservice-3o66.onrender.com/chatGrp/createGrp",
      {
        Name: name,
        createdBy: userName,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    )
    .then(async (resp) => {
      console.log(resp.data);
      await getTeams();
    });
};

export function CreateTeam({ closeModal = () => {} }) {
  const [teamName, setTmName] = useState("");
  const [loading, setLoad] = useState("");
  return (
    <>
      {loading && <Loader text={loading} />}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-8 rounded w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Create Team</h2>
          {/* Folder name input section */}
          <label className="block text-black text-sm font-bold mb-1 align-left">
            Team Name
          </label>
          <input
            placeholder="Enter team name"
            onChange={(val) => {
              setTmName(val.target.value);
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
              setLoad("Creating new team");
              const newTeam = await createTeam(teamName);
              setLoad("");
              closeModal();
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
