// import React, {useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import Container from "components/Container";
// import Toastr from "component/Common/Toastr";
// import Button from "components/Button";
// import PageLoader from "components/PageLoader";
// import { setAuthHeaders } from "apis/axios";
// import pollsApi from "apis/polls";
// //import responseApi from "apis/responses"
// import { logger } from "common/logger";
// //import { getFromLocalStorage } from "helpers/storage";

// const ShowPoll = () => {
//   const { id } = useParams();
//   //const userId = getFromLocalStorage("authUserId");
//   const [pageLoading, setPageLoading] = useState(true);
//   const [poll, setPoll] = useState({title: ""});
//   const [options, setOptions] = useState([]);
//   const [choice, setChoice] = useState(-1);
//   //const [showResult, setShowResult] = useState(false);

//   // const selectOption = async option_id => {
//   //   if (!choice) {
//   //     try {
//   //       await responseApi.create({
//   //         response: {option_id, poll_id: poll.id }});
//   //       fetchPollDetails();
//   //       })
//   //     }
//   //   }
//   // }

//   const fetchPollDetails = async () => {
//     try {
//       setAuthHeaders();
//       const response = await pollsApi.show(id);
//       setChoice(response.data.user_response_option_id);
//       setPoll(response.data.poll);
//       setOptions(response.data.options);
//     } catch (error) {
//       logger.error(error);
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPollDetails();
//   }, []);

//   const clickHandler = id => setChoice(id);

//   const handleSubmit = async () => {
//     setOptions(state => {
//       state.map(obj => {
//         if (obj.id == choice) obj.vote = ++obj["vote"];
//       });
//       return state;
//     });

//     setShowResult(true);
//     await pollsApi.update(id, {
//       poll: { title, options_attributes: options },
//     });
//     Toastr.success("Thanks for voting!");
//   };

//   const totalVote = () => {
//     let total = 0;
//     options.map(option => (total += option.vote));
//     return total;
//   };

//   const calcVote = vote => {
//     const totalVotes = totalVote();

//     if (totalVotes == 0) return 0;

//     return (vote * 100) / totalVotes;
//   };

//   if (pageLoading) {
//     return <PageLoader />;
//   }

//   return (
//     <Container>
//       <div className="w-3/4 mx-auto py-6 mt-10">
//         <h1 className="text-bb-purple text-4xl font-medium">{poll.title}</h1>
//         <ul className={`mb-6 mt-3 px-6 ${showResult && "pointer-events-none"}`}>
//           {options?.map(option => (
//             <li
//               className="my-6 block w-full"
//               key={option.id}
//               onClick={() => clickHandler(option.id)}
//             >
//               <span
//                 className={`border rounded-full p-3 w-3/4 inline-block cursor-pointer hover:bg-blue-300 hover:text-white ${
//                   choice == option.id && "bg-blue-300 text-white"
//                 }`}
//               >
//                 {option.content}
//               </span>
//               {showResult && (
//                 <span className="w-1/4 pl-4">
//                   {calcVote(option.vote).toFixed(2)}%
//                 </span>
//               )}
//             </li>
//           ))}
//         </ul>
//         {choice != null && (
//           <div className="flex justify-center px-6">
//             <Button
//               loading={false}
//               onClick={handleSubmit}
//               buttonText="Submit"
//               showResult={showResult}
//             />
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default ShowPoll;
