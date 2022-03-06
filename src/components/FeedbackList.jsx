import {useContext} from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./shared/Spinner";
import FeedbackContext from "../context/FeedbackContext";

{/*

If there is no feedback then display a message indicating there is no feedback.

If there is feedback, display the feedback by looping through all of the feedback items and passing them over as a prop to the FeedbackItem component.

*/}

function FeedbackList() {

  const {feedback, isLoading} = useContext(FeedbackContext); // we're going to use this global state instead to get the feedback

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>
  }

  return isLoading ? <Spinner /> : (<div className="feedback-list">
    {
      feedback.map((item) => (
        <FeedbackItem 
          key={item.id} 
          item={item} 
        />
      ))
    }
  </div>)
}


export default FeedbackList;
