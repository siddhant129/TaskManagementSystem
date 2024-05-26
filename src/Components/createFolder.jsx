import axios from "axios";
import { useState } from "react";
import { Loader } from "./Loader";

const userData = localStorage.getItem("data");
var data = JSON.parse(userData);
//Create new folder
const createFolder = async (name, desc) => {
  try {
    const newFolder = await axios
      .post(
        "https://toodo-api.onrender.com/app/v1/folder/createfolder",
        {
          folderName: name,
          description: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        data.folders = resp.data.folders;
        localStorage.setItem("data", JSON.stringify(data));
      });
  } catch (error) {}
  return data;
};

export function CreateFolder({ closeModal = () => {} }) {
  const [folderName, setFldName] = useState("");
  const [folderDesc, setFldDesc] = useState("");
  const [loading, setLoad] = useState("");
  return (
    <>
      {loading && <Loader text={loading} />}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-8 rounded w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Create Folder</h2>
          {/* Folder name input section */}
          <label className="block text-black text-sm font-bold mb-1 text-left">
            Folder Name
          </label>
          <input
            placeholder="Enter folder name"
            onChange={(val) => {
              setFldName(val.target.value);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
          />
          {/* Folder description input section */}
          <label className="block text-black text-sm font-bold mb-1 text-left">
            Folder Description
          </label>
          <input
            placeholder="Enter folder description"
            onChange={(val) => {
              setFldDesc(val.target.value);
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
              setLoad("Creating new folder");
              const data = await createFolder(folderName, folderDesc);
              setLoad("");
              closeModal();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
