import React from "react";
import classnames from "classnames";

const Option = ({ id, content, response, selectOption, votesPercentage }) => {
  return (
    <div
      className={"m-5 top-0 relative border-1 "}
      onClick={() => selectOption(id)}
    >
      <div
        className={classnames(
          "flex justify-between rounded-full items-center h-12 p-2",
          {
            "bg-gray-300 hover:bg-gray-600 cursor-pointer": !response,
          }
        )}
        style={
          response
            ? {
              background: `linear-gradient(to left, #e2e8f0 ${
                100 - votesPercentage
              }%, #9ba9bd 0%)`,
            }
            : null
        }
      >
        <div>
          {content}{" "}
          {id === response ? <i className="ml-2 ri-check-fill "></i> : null}
        </div>
        {response ? <div>{votesPercentage}%</div> : null}
      </div>
    </div>
  );
};

export default Option;
