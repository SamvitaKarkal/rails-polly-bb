import React, { useState, useEffect } from "react";
import { all, isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import { setAuthHeaders } from "apis/axios";

const Dashboard = ({ history }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      setAuthHeaders();
      const response = await pollsApi.list();
      setPolls(response.data.polls);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  //   const destroyPoll = async slug => {
  //     try {
  //       await pollsApi.destroy(slug);
  //       await fetchPolls();
  //     } catch (error) {
  //       logger.error(error);
  //     }
  //   };

  //   const showPoll = slug => {
  //     history.push(`/polls/${slug}/show`);
  //   };

  //   const updatePoll = slug => {
  //     history.push(`/polls/${slug}/edit`);
  //   };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(polls)) {
    return (
      <Container>
        <h1 className="my-5 text-xl leading-5 text-center">
          No polls created yet. Be the first to create one!
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Hello World</h1>
      <ListPolls
        data={polls}
        // destroyPoll={destroyPoll}
        // updatePoll={updatePoll}
        // showPoll={showPoll}
      />
    </Container>
  );
};

export default Dashboard;
