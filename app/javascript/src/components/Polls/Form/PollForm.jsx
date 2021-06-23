import React from "react";
import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type,
  title,
  setTitle,
  options,
  setOptions,
  loading,
  handleSubmit,
}) => {
  const handleChange = (e, idx) => {
    e.preventDefault();
    setOptions(preState => {
      const curState = [...preState];
      curState[idx].content = e.target.value;
      return curState;
    });
  };
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="w-full">
        <h2>{type === "create" ? "" : title}</h2>
        <Input
          label="Title"
          placeholder="enter Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="w-3/4">
        <Input
          label="First Option"
          placeholder="First Option"
          value={options[0].content}
          onChange={e => handleChange(e, 0)}
        />
        <Input
          label="Second Option"
          placeholder="Second Option"
          value={options[1].content}
          onChange={e => handleChange(e, 1)}
        />
        <Input
          label="Third Option"
          placeholder="Third Option"
          value={options[2].content}
          onChange={e => handleChange(e, 2)}
        />
        <Input
          label="Fourth Option"
          placeholder="Fourth Option"
          value={options[3].content}
          onChange={e => handleChange(e, 3)}
        />
      </div>
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Poll" : "Update Poll"}
        loading={false}
      />
    </form>
  );
};

export default PollForm;
