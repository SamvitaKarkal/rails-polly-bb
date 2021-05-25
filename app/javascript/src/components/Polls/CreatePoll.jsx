import React, { useState } from "react";
import Container from "components/Container";
import PollForm from "./Form/PollForm";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState();
  const [options, setOptions] = useState([
    { content: "" },
    { content: "" },
    { content: "" },
    { content: "" },
  ]);

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      await pollsApi.create({
        poll: { title, option_attributes: options },
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <PollForm
        type="create"
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
