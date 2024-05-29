import axios from "axios";
import { useState } from "react";
import { MessagePopUp } from "./msgPopup";
import { AddUser } from "./addUser";

const userData = localStorage.getItem("data");
var data = JSON.parse(userData);

//Get team members
const getMembers = (teamName) => {
  const allTeams = JSON.parse(localStorage.getItem("Teams"));
  var allMembers = [];
  allTeams.filter((team) => {
    if (team.Name === teamName) {
      allMembers = team.users;
      return team;
    }
  });
  return allMembers;
};

//Get latest teams data
const getTeams = async () => {
  const grps = await axios.get(
    "https://chatappbackendservice-3o66.onrender.com/chatGrp/getUserGrps",
    {
      headers: { Authorization: `Bearer ${data.token}` },
    }
  );
  localStorage.setItem("Teams", JSON.stringify(grps.data.userGrps));
};

const addUser = async (newMember, teamName) => {
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

export function Members({ members = [], teamName }) {
  const [userModal, setUModal] = useState(false);
  const [newMember, setMember] = useState("");
  const [msgPop, setPop] = useState("");
  return (
    <>
      {msgPop !== "" && <MessagePopUp message={msgPop} />}
      <div>
        <ul className="flex flex-wrap flex-row justify-around">
          {members &&
            members.map((member) => (
              <li
                id={member.user._id}
                key={member.user._id}
                className="rounded-[7px] w-9/12 mb-1 border border-blue-black-200 bg-transparent"
                style={{ textAlign: "center" }}
              >
                {member.user.userName}
              </li>
            ))}
        </ul>

        {/* Button for adding new user */}
        {teamName && (
          <div className="flex justify-center ">
            <button
              onClick={() => {
                setUModal(true);
              }}
              className="rounded-lg border border-gray-900 mt-2 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Add +
            </button>
          </div>
        )}
      </div>
      {/* Modal for user details form */}
      {userModal ? (
        <AddUser
          teamName={teamName}
          closeModal={(msg) => {
            if (msg) {
              setPop(msg);
            }
            setUModal(false);
            setTimeout(() => {
              setPop("");
            }, 1000);
          }}
        />
      ) : null}
    </>
  );
}
