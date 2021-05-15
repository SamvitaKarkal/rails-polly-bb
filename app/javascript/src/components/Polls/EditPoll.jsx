import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PollForm from "./Form/PollForm";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
import Toastr from "components/Common/Toastr";

const EditPoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.update({
        slug,
        payload: { poll: { title, user_id: userId } },
      });
      setLoading(false);
      Toastr.success("Successfully updated poll.");
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(slug);
      setTitle(response.data.poll.title);
      setUserId(response.data.poll.user_id);
      setOptions(response.data.poll.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PollForm
        type="update"
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

export default EditPoll;
