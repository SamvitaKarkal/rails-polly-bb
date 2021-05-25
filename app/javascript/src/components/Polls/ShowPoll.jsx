import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setAuthHeaders } from "apis/axios";
import pollsApi from "apis/polls";
import responseApi from "apis/responses";
import Container from "components/Container";
import Option from "./Options/Option.jsx";
import PageLoader from "components/PageLoader";

const ShowPoll = () => {
  const { slug } = useParams();
  const [poll, setPoll] = useState({ title: "" });
  const [options, setOptions] = useState([]);
  const [pageLoading, setPageLoading] = useState();
  const [userResponse, setUserResponse] = useState(null);

  const selectOption = async option_id => {
    if (!userResponse) {
      try {
        await responseApi.create({
          response: { option_id, poll_id: poll.id },
        });
        fetchPollDetails();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  const fetchPollDetails = async () => {
    try {
      setAuthHeaders();
      const response = await pollsApi.show(slug);
      setUserResponse(response.data.user_response_option_id);
      setPoll(response.data.poll);
      setOptions(response.data.options);
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
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-between items-center py-4">
        <h1 className="text-bb-purple text-4xl font-medium py-4 px-8">
          {poll.title}
        </h1>
      </div>
      <div className="w-full">
        {options?.map(option => (
          <Option
            key={option.id}
            id={option.id}
            content={option.content}
            response={userResponse}
            selectOption={selectOption}
            votesPercentage={option.response_percentage}
          />
        ))}
      </div>
    </Container>
  );
};

export default ShowPoll;
