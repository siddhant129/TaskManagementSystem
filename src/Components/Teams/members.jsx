import axios from "axios";
import { useState } from "react";
import { MessagePopUp } from "./msgPopup";

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
        <ul>
          {members &&
            members.map((member) => (
              <li
                id={member.user._id}
                key={member.user._id}
                className="rounded-[7px] border border-blue-black-200 bg-transparent"
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
              className="rounded-lg p-1 mt-1 bg-sky-500 text-l"
            >
              Add +
            </button>
          </div>
        )}
      </div>
      {/* Modal for user details form */}
      {userModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden border-10 overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Add new member</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setUModal(false)}
                  >
                    <span className="text-black opacity-7 flex justify-center align-center h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const resp = await addUser(newMember, teamName);
                      console.log("Members");

                      members = getMembers();
                      console.log(members);
                      setUModal(false);
                      setPop(resp);
                      setTimeout(() => {
                        setPop("");
                      }, 2000);
                    }}
                    className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                  >
                    <label className="block text-black text-sm font-bold mb-1">
                      User Name
                    </label>
                    <input
                      onChange={(val) => {
                        setMember(val.target.value);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setUModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={async () => {
                          const resp = await addUser(newMember, teamName);
                          console.log(resp);
                          members = getMembers();
                          setUModal(false);
                          setPop(resp);
                          setTimeout(() => {
                            setPop("");
                          }, 2000);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
