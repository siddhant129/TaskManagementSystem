import { useState } from "react";
import "../index.css";
import axios from "axios";
import { CreateFolder } from "./createFolder";
const taskProp = {
  Token: "",
  closeTask: () => {},
  changeFolder: () => {},
};
const addTask = async (event, token) => {
  event.preventDefault();
  console.log(token);
  const response = await fetch(
    "https://toodo-api.onrender.com/app/v1/tasks/createTask",

    {
      method: "POST",
      body: JSON.stringify({
        folderId: localStorage.getItem("folderId"),
        name: event.target[0].value,
        description: event.target[1].value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).catch((e) => {
    console.log(e.message);
  });
  const newTask = await response.json().catch((err) => {
    console.log(err.message);
  });
  return newTask.tasks;
};

//Get user tasks

async function getTasks(folderId, token) {
  try {
    const folders = await axios.get(
      "https://toodo-api.onrender.com/app/v1/folder",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("folders", folders);
    if (folders.data) {
      var data = folders.data;
      const allFolders = data.allfolders;
      var tasks = [];
      allFolders.forEach((folder) => {
        if (folderId === folder.id) {
          tasks = folder.tasks;
        }
      });
      return tasks;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

// Function to update task created
async function updateTask(token, folderId, id, name, desc) {
  // event.preventDefault()
  try {
    const updateTask = await axios.put(
      `https://toodo-api.onrender.com/app/v1/tasks/updateTask/${folderId}`,
      {
        id: id,
        name: name,
        description: desc,
        // headers: { Authorization: token },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (updateTask) {
      console.log(updateTask);
    }
    console.log(updateTask);
  } catch (error) {
    console.log(error.message);
  }
}

function AddTaskComp({ closeTask, Token, taskRef } = taskProp) {
  return (
    <>
      <div
        id="authentication-modal"
        className="flex justify-center items-center"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create new task
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={closeTask}
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
            <div className="p-4 md:p-5">
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  const newTask = await addTask(e, Token);
                  taskRef(newTask);
                  console.log("here new task", newTask);
                }}
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task name
                  </label>
                  <input
                    // type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    // placeholder="name@company.com"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="desc"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  // onClick={AddTask()}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Folders() {
  const [taskClick, setTask] = useState(false);
  const [tasks, setFolder] = useState([]);
  const [createFolder, setCrtFld] = useState(false);
  const userData = localStorage.getItem("data");
  var data = JSON.parse(userData);
  // var folders = data.folders;
  var allFolders = [];
  data.folders.forEach((folder) => {
    allFolders.push(folder);
  });
  console.log("all", allFolders);
  if (allFolders.length !== 0) {
    return (
      //add new folder form
      <>
        {createFolder && (
          <CreateFolder
            closeModal={() => {
              setCrtFld(false);
            }}
          />
        )}
        <div className="folders-main ">
          <div className="container1">
            <div className="folders">
              <h3
                key={"projectTitle"}
                className="font-bold text-center text-xl text-primary"
              >
                Projects
              </h3>
              <ul>
                {allFolders.map((folder, index) => (
                  <div
                    key={folder.id}
                    id={folder.id + "fdiv"}
                    className="text-center subHead folderBg"
                  >
                    <li
                      key={folder.id}
                      id={folder.id}
                      className="folder text-subHeading list-inside list-none list-bg-gray"
                    >
                      <a
                        onClick={async () => {
                          console.log("tasks push", folder.tasks);
                          localStorage.setItem("folderId", folder.id);
                          const tasks = await getTasks(folder.id, data.token);
                          console.log("got the tasks", tasks);
                          if (tasks) {
                            setFolder(tasks);
                          } else {
                            setFolder([]);
                          }
                        }}
                        key={folder.id + "href"}
                        id={folder.id + "href"}
                      >
                        {folder.folderName}
                      </a>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  setCrtFld(true);
                }}
              >
                + Add folder
              </button>
            </div>
          </div>

          {/* Tasks */}
          <div className="tasks">
            <h3 className="font-bold text-center text-xl text-primary">
              Tasks
            </h3>
            {tasks !== [] && (
              <div>
                <ul>
                  {tasks.map((task, index) => (
                    <div className="subHead">
                      <div>
                        {/* Task heading */}
                        <li
                          key={task._id + "head"}
                          id={task._id + "head"}
                          className="folder text-subHeading list-inside list-none list-bg-gray"
                        >
                          <div
                            key={task._id + "hdiv"}
                            id={task._id + "hdiv"}
                            className="taskHead"
                          >
                            <h1
                              id={task._id}
                              contentEditable="false"
                              key={task._id}
                            >
                              {task.name}
                            </h1>
                            {/* Save button with image */}
                            <a
                              href="javascript:void(0)"
                              key={task._id + "ahref"}
                              id={task._id + "save"}
                              style={{ visibility: "hidden", display: "none" }}
                              onClick={(e) => {
                                const saveId = document.getElementById(
                                  task._id + "save"
                                );
                                var tHead = document.getElementById(task._id);
                                var editId = document.getElementById(
                                  task._id + "edit"
                                );
                                var tDesc = document.getElementById(
                                  task._id + "desc"
                                );
                                editId.style.visibility = "visible";
                                console.log(saveId, task._id);
                                tHead.contentEditable = "false";
                                tDesc.contentEditable = "false";
                                saveId.style.visibility = "hidden";
                                // Calling function to update task
                                console.log(tHead.innerText);
                                const folderId =
                                  localStorage.getItem("folderId");
                                console.log(data.token);
                                updateTask(
                                  data.token,
                                  folderId,
                                  task._id,
                                  tHead.innerText,
                                  tDesc.innerText
                                );
                              }}
                            >
                              <img
                                key={task._id + "simg"}
                                id={task._id + "simg"}
                                src="../Images/save.png"
                                alt="editimg"
                              />
                            </a>
                            {/* Edit button with image */}
                            <a
                              href="javascript:void(0)"
                              key={task._id + "edit"}
                              id={task._id + "edit"}
                              onClick={(e) => {
                                var tHead = document.getElementById(task._id);
                                var editId = document.getElementById(
                                  task._id + "edit"
                                );
                                var tDesc = document.getElementById(
                                  task._id + "desc"
                                );
                                const saveId = document.getElementById(
                                  task._id + "save"
                                );
                                editId.style.visibility = "hidden";
                                console.log(saveId, task._id);
                                // e.target.parent.style.visibility = "hidden";
                                tHead.contentEditable = "true";
                                tDesc.contentEditable = "true";
                                saveId.style.visibility = "visible";
                                saveId.style.display = "block";

                                // setEdit(true);
                              }}
                            >
                              <img
                                src="../Images/editimg.jpg"
                                alt="editimg"
                                id={task._id + "editimg"}
                              />
                            </a>
                          </div>
                        </li>

                        {/* //Task description */}
                        <li
                          key={task._id + "desc"}
                          id={task._id + "desc"}
                          contentEditable="false"
                        >
                          <h2 key={task.id} id={task.id + "desch2"}>
                            {task.description}
                          </h2>
                        </li>
                      </div>

                      {/* <li
                        className="block"
                        key={task._id}
                        id={task._id + "sch"}
                      >
                        <div
                          key={task.id + "tdate"}
                          id={task._id + "tdate"}
                          className="taskDate"
                        >
                          <img
                            id={task._id + "schimg"}
                            key={task._id + "schimg"}
                            src="../Images/schedule.png"
                            alt="schedule img"
                          />
                          <p>{task.date.substring(0, 10)}</p>
                        </div>
                      </li> */}
                      <li key={task.id} id={task._id + "time"}>
                        <div className="taskDate" id={task._id + "timed"}>
                          <img
                            src="../Images/watchimg.jpg"
                            id={task._id + "timeimg"}
                            alt="watch img"
                          />
                          <p id={task._id + "timep"}>
                            {task.date.substring(11, 16)}
                          </p>
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex align-center justify-center">
              {!taskClick && (
                <>
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
                    // style={{ width: }}
                    onClick={setTask}
                  >
                    + Add
                  </button>
                </>
              )}
            </div>
            {taskClick && (
              <AddTaskComp
                Token={data.token}
                closeTask={() => {
                  setTask(false);
                }}
                taskRef={(newTask) => {
                  console.log("taskRef");
                  const folderId = localStorage.getItem("folderId");
                  setFolder(newTask);
                  setTask(false);
                  data.folders.forEach((folder, index) => {
                    if (folderId === folder.id) {
                      // return newTask;
                      data.folders[index].tasks = newTask;
                    }
                    // return folder;
                  });
                  localStorage.setItem("data", JSON.stringify(data));
                  // const data1 = localStorage.getItem("data");
                  // console.log("folders", data.folders, "data1", data1);
                }}
              />
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {createFolder && (
          <CreateFolder
            closeModal={() => {
              setCrtFld(false);
            }}
          />
        )}
        <div className="flex text-center flex-col align-center justify-center ">
          <h1 className="font-bold inline-block" style={{ fontSize: "30px" }}>
            No projects yet created
          </h1>
          <div className="flex align-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue text-white font-bold py-2 px-4 rounded-full"
              style={{ width: "10%" }}
              onClick={() => {
                setCrtFld(true);
              }}
            >
              + Add
            </button>
          </div>
        </div>
      </>
    );
  }
}
