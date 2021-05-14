import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import { Link } from "react-router-dom";

import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import pollsApi from "apis/polls";
import { setAuthHeaders } from "apis/axios";
// import { getFromLocalStorage } from "helpers/storage";

const Dashboard = ({ history }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      setAuthHeaders();
      const response = await pollsApi.list();
      setPolls(response.data.polls);
    } catch (error) {
      // logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createPoll = slug => {
    history.push(`/polls/create`);
  };
  // const destroyPoll = async slug => {
  //   try {
  //     await pollsApi.destroy(slug);
  //     await fetchPolls();
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // };

  const showPoll = slug => {
    history.push(`/tasks/${slug}/show`);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return <PageLoader />;
  }
  return (
    <Container>
      <div className="flex justify-between items-center">
        <h1 className="text-indigo-500 text-3xl font-medium font-bold">
          Polls
        </h1>
        <Button
          type="button"
          buttonText="Create new poll +"
          loading={false}
          onClick={createPoll}
        />
      </div>
      {either(isNil, isEmpty)(polls) ? (
        <h1 className="text-xl leading-5 text-center mt-4">
          No polls created yet. Create new one now!
        </h1>
      ) : (
        <ListPolls
          data={polls}
          // destroyPoll={destroyPoll}
          // updatePoll={updatePoll}
          showPoll={showPoll}
        />
      )}
    </Container>
  );
};

export default Dashboard;
