import React, { useState, useEffect } from "react";
import pollsApi from "apis/polls";
import responseApi from "apis/responses";
import { useParams } from "react-router-dom";
import Container from "components/Container";
import { setAuthHeaders } from "apis/axios";
import Option from "./Options/Option.jsx";
const ShowPoll = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState({ title: "" });
  const [options, setOptions] = useState([]);
  const [userResponse, setUserResponse] = useState(null);

  const selectOption = async option_id => {
    if (!userResponse) {
      try {
        await responseApi.create({ response: { option_id, poll_id: poll.id } });
        fetchPoll();
      } catch (error) {
        logger.error(error);
      }
    }
  };
  const fetchPoll = async () => {
    setAuthHeaders();
    const pollsResponse = await pollsApi.show(id);
    setUserResponse(pollsResponse.data.user_response_option_id);
    setPoll(pollsResponse.data.poll);
    setOptions(pollsResponse.data.options);
  };
  useEffect(() => {
    fetchPoll();
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center mt-8 py-4 border-b">
        <h1 className="text-bb-purple text-4xl font-medium">{poll.title}</h1>
      </div>
      <div className="w-full border">
        {options?.map(option => (
          <Option
            key={option.id}
            id={option.id}
            content={option.content}
            userResponse={userResponse}
            selectOption={selectOption}
            votesPercentage={option.response_percentage}
          />
        ))}
      </div>
    </Container>
  );
};

export default ShowPoll;
