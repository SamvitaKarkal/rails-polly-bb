import React from "react";
import Button from "components/Button";

const ListPolls = ({ polls, history, isLoggedIn, updatePoll, destroyPoll }) => {
  const routeHandler = (slug, target) => {
    if (isLoggedIn) history.push(`/polls/${slug}/${target}`);
    else history.push("/login");
  };

  return (
    <ul className="bg-white mt-4">
      {polls?.map(poll => (
        <li key={poll.slug} className="py-1">
          {isLoggedIn && (
            <div className="grid grid-cols-12 gap-2">
              <div
                className="col-span-8 mt-5 pt-4 hover:text-purple-700 text-lg font-medium cursor-pointer"
                onClick={() => routeHandler(poll.slug, "show")}
              >
                {poll.title}
              </div>
              <div className="col-span-2">
                <Button
                  type="button"
                  buttonText="Edit"
                  onClick={() => updatePoll(poll.slug)}
                />
              </div>
              <div className="col-span-2">
                <Button
                  type="button"
                  buttonText="Delete"
                  onClick={() => destroyPoll(poll.slug)}
                />
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListPolls;
