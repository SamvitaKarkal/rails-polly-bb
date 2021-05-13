import React from "react";

const ListPolls = ({ polls, history, isLoggedIn, destroyPoll }) => {
  const routeHandler = (id, target) => {
    if (isLoggedIn) history.push(`/polls/${id}/${target}`);
    else history.push("/login");
  };

  return (
    <ul className="mt-2">
      {polls.map(poll => (
        <li key={poll.id} className="py-1">
          <div className="grid grid-cols-3 gap-4">
            <div
              className="col-span-2 hover:text-purple-700 text-lg font-medium cursor-pointer"
              onClick={() => routeHandler(poll.id, "show")}
            >
              {poll.title}
            </div>
            {isLoggedIn && (
              <div className="col-span-1">
                <i
                  className="text-2xl text-center text-bb-border
                  transition duration-300 ease-in-out
                  ri-edit-box-line hover:text-blue-500 mx-4"
                  title="Edit"
                  onClick={() => routeHandler(poll.id, "edit")}
                ></i>
                <i
                  className="text-2xl text-center text-bb-border
                  transition duration-300 ease-in-out
                  ri-delete-bin-5-line hover:text-red-600 cursor-pointer"
                  title="Delete"
                  onClick={() => destroyPoll(poll.id)}
                ></i>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListPolls;
