import React, { useState } from "react";
import { ChatForm } from "./chatForm";
import { v4 as uuidv4 } from "uuid";
import { Nav } from "../NavBar";
import "../../index.css";
import { Teams } from "./teams";
import { Members } from "./members";
uuidv4();
const userData = localStorage.getItem("data");
var userName;
var data = JSON.parse(userData);
if (!data) {
  userName = "";
} else {
  userName = data.userName;
}

const socket = new WebSocket(
  "wss:chatappbackendservice-3o66.onrender.com?username=" + userName
);

//Connection open
socket.addEventListener("open", (e) => {
  console.log("Connected to server");
});

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

export function Chat({ teams }) {
  const [userTeams, setTeams] = useState("");
  const [members, setMembers] = useState("");
  var chatArr = [];
  const chatArr1 = localStorage.getItem("chats");

  if (chatArr1) {
    chatArr = JSON.parse(chatArr1);
  }

  const [allChats, setChats] = useState(chatArr);
  const [heading, setHead] = useState("");
  const handleChat = (chat) => {
    console.log("here is your chat ", chat);
    chatArr.push({
      id: uuidv4,
      client: false,
      team: userTeams,
      class: "yourMsg",
      message: "You: " + chat,
    });
    localStorage.setItem("chats", JSON.stringify(chatArr));
    setChats([
      ...allChats,
      {
        id: uuidv4,
        client: false,
        team: userTeams,
        class: "yourMsg",
        message: "You: " + chat,
      },
    ]);
    socket.send(
      JSON.stringify({ user: "sid", team: userTeams, message: chat })
    );
    console.log(allChats);
  };

  socket.addEventListener("message", async (e) => {
    const newMsg = await new Response(e.data).text();

    try {
      const parseData = JSON.parse(newMsg);
      if (parseData.server) {
        setHead(parseData.message);
      } else {
        chatArr.push({
          id: uuidv4,
          client: true,
          team: userTeams,
          class: "clientMsg",
          message: parseData.message,
        });
        localStorage.setItem("chats", JSON.stringify(chatArr));
        console.log("else not server");
        setChats(chatArr);
        // setChats([
        //   ...allChats,
        //   {
        //     id: uuidv4,
        //     client: true,
        //     class: "clientMsg",
        //     message: parseData.message,
        //   },
        // ]);
      }
    } catch (e) {
      console.log("catch of msg", newMsg);
      chatArr.push({
        id: uuidv4,
        client: true,
        team: userTeams,
        class: "clientMsg",
        message: newMsg,
      });
      localStorage.setItem("chats", JSON.stringify(chatArr));
      setChats(chatArr);
      localStorage.setItem("chats", allChats);
    }
  });

  return (
    <>
      <Nav userName={data.userName} />
      <h1 id="heading" style={{ justifyContent: "center", display: "flex" }}>
        {heading}
      </h1>
      <div className="teams">
        <div className="">
          <h1
            className="teamDiv rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent "
            style={{ justifyContent: "center", display: "flex" }}
          >
            Teams
          </h1>
          <Teams
            groups={userTeams}
            currGrp={(teamName) => {
              console.log("hmmm parent is listnening", teamName);
              const allMembers = getMembers(teamName);
              setTeams(teamName);
              setMembers(allMembers);
            }}
          />
        </div>
        {/* bg-cyan-300 */}
        <div className=" chatWindow peer w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100">
          <h1
            id="teamName"
            className="rounded-[7px] border border-blue-gray-200 bg-transparent"
          >
            {userTeams}
          </h1>
          <div
            className="w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[450px] xl:h-[600px]"
            // src={}
            style={{ overflow: "scroll" }}
          >
            <div className="chatDiv">
              <ul className="chatBox">
                {allChats &&
                  allChats.map(
                    (chat, index) =>
                      // chat.client && (
                      chat.team === userTeams && (
                        <div className={chat.class + "Div "}>
                          <li className={chat.class} key={index}>
                            <span className="rounded-[5px] border border-blue-black-200 bg-transparent">
                              {chat.message}
                            </span>
                          </li>
                        </div>
                      )
                  )}
              </ul>
            </div>
          </div>
          <ChatForm chatData={handleChat} />
        </div>
        <div>
          <h1
            className="membersDiv rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent "
            style={{ justifyContent: "center", display: "flex" }}
          >
            Chat members
          </h1>
          <Members members={members} teamName={userTeams} />
        </div>
      </div>
    </>
  );
}
