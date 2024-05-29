import axios from "axios";
import { useEffect, useState } from "react";
import { CreateTeam } from "./createTeam";

const userData = localStorage.getItem("data");
var data = JSON.parse(userData);

export function Teams({ groups, currGrp = (grpName) => {} }) {
  const grps = localStorage.getItem("Teams");
  const [teams, setTeams] = useState(JSON.parse(grps));
  const [userModal, setUModal] = useState(false);
  const [createTeams, setCrtTeam] = useState(false);

  return (
    <>
      {createTeams && (
        <CreateTeam
          closeModal={() => {
            const grps = localStorage.getItem("Teams");
            setTeams(JSON.parse(grps));
            setCrtTeam(false);
          }}
        />
      )}
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
                      // const resp = await addUser(newMember, teamName);
                      // console.log("Members");

                      // members = getMembers();
                      // console.log(members);
                      // setUModal(false);
                      // setPop(resp);
                      // setTimeout(() => {
                      //   setPop("");
                      // }, 2000);
                    }}
                    className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                  >
                    <label className="block text-black text-sm font-bold mb-1">
                      User Name
                    </label>
                    <input
                      onChange={(val) => {
                        // setMember(val.target.value);
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
                          // const resp = await addUser(newMember, teamName);
                          // console.log(resp);
                          // members = getMembers();
                          // setUModal(false);
                          // setPop(resp);
                          // setTimeout(() => {
                          //   setPop("");
                          // }, 2000);
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
      <div>
        <ul className="flex flex-wrap flex-row justify-around">
          {teams &&
            teams.map((team, index) => (
              <li
                key={index}
                id={index}
                className="rounded-[5px] w-9/12 mb-1 hover:bg-gray-200 border border-blue-black-200 bg-transparent"
                style={{ textAlign: "center" }}
              >
                <a
                  href="#"
                  onClick={() => {
                    currGrp(team.Name);
                  }}
                  id={index}
                >
                  {team.Name}
                </a>
              </li>
            ))}
        </ul>
        <div className="flex justify-center ">
          <button
            className="rounded-lg border border-gray-900 mt-2 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => {
              setCrtTeam(true);
            }}
          >
            Create +
          </button>
        </div>
      </div>
    </>
  );
}
