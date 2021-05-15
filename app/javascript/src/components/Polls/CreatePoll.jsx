import React, { useState, useEffect } from "react";
import Container from "components/Container";
import PollForm from "./Form/PollForm";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
//import { setAuthHeaders } from "apis/axios";
// import usersApi from "apis/users";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [options, setOptions] = useState([
    { option: "" },
    { option: "" },
    { option: "" },
    { option: "" },
  ]);

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      await pollsApi.create({ poll: { title, options_attributes: options } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <PollForm
        title={title}
        setTitle={setTitle}
        options={options}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreatePoll;
