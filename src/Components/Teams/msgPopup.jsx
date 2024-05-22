export function MessagePopUp({ message }) {
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-8 rounded w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Modal Content</h2>
          <p>{message}</p>
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            onClick={() => {}}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
}
