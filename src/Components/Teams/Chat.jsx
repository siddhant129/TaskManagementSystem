import React, { useState } from "react";
import { ChatForm } from "./chatForm";
import { v4 as uuidv4 } from "uuid";
import { Nav } from "../NavBar";
import "../../index.css";
import { json } from "react-router-dom";
uuidv4();
const socket = new WebSocket("wss:chatappbackendservice-3o66.onrender.com");

//Connection open
socket.addEventListener("open", (e) => {
  console.log("Connected to server");
});

export function Chat({ chats }) {
  const [allChats, setChats] = useState([]);
  const [heading, setHead] = useState("");

  const handleChat = (chat) => {
    console.log("here is your chat ", chat);
    setChats([
      ...allChats,
      { id: uuidv4, client: false, class: "yourMsg", message: chat },
    ]);
    socket.send(JSON.stringify({ user: "sid", message: chat }));
    console.log(allChats);
  };

  socket.addEventListener("message", async (e) => {
    const newMsg = await new Response(e.data).text();

    try {
      const parseData = JSON.parse(newMsg);
      if (parseData.server) {
        setHead(parseData.message);
      } else {
        setChats([
          ...allChats,
          {
            id: uuidv4,
            client: true,
            class: "clientMsg",
            message: parseData.message,
          },
        ]);
      }
    } catch (e) {
      setChats([
        ...allChats,
        { id: uuidv4, client: true, class: "clientMsg", message: newMsg },
      ]);
    }
  });

  return (
    <>
      <Nav />
      <div className="teams">
        <div>
          <h1 style={{ justifyContent: "center", display: "flex" }}>Teams</h1>
        </div>
        {/* bg-cyan-300 */}
        <div className=" chatWindow peer w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100">
          <h1
            id="heading"
            style={{ justifyContent: "center", display: "flex" }}
          >
            {heading}
          </h1>
          <div
            className="w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[450px] xl:h-[600px]"
            // src={}
            style={{ overflow: "scroll" }}
          >
            <div className="chatDiv">
              <ul className="chatBox">
                {allChats.map((chat, index) => (
                  // chat.client && (
                  <li className={chat.class} key={index}>
                    {chat.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ChatForm chatData={handleChat} />
        </div>
        <div>
          <h1 style={{ justifyContent: "center", display: "flex" }}>
            Chat members
          </h1>
        </div>
      </div>
    </>
  );
}
