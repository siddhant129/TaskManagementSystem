import React from "react";
import ReactLoading from "react-loading";
export function Loader({ text }) {
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-100 flex items-center justify-center z-10">
        <div className=" p-8 rounded w-96 text-center">
          <h1 className="block text-black text-lg font-bold mb-1 align-center ">
            {text}
          </h1>
          <div className="flex items-center justify-center">
            <ReactLoading type="balls" color="#35B2F3" height={30} width={50} />
          </div>
        </div>
      </div>
    </>
  );
}
