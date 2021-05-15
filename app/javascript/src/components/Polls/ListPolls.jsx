import React from "react";
import Button from "components/Button";

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
                <Button
                  title="Edit"
                  onClick={() => updatePoll(poll.slug)}
                ></Button>
                <Button
                  title="Delete"
                  onClick={() => destroyPoll(poll.id)}
                ></Button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListPolls;
