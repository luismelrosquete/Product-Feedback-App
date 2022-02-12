import PropTypes from "prop-types";
import FeedbackItem from "./FeedbackItem";

{/*

If there is no feedback then display a message indicating there is no feedback.

If there is feedback, display the feedback by looping through all of the feedback items and passing them over as a prop to the FeedbackItem component.

*/}

function FeedbackList({feedback, handleDelete}) {

  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }

  return (
    <div className="feedback-list">

      {
        feedback.map((item) => (
          <FeedbackItem 
            key={item.id} 
            item={item} 
            handleDelete={handleDelete}
          />
        ))
      }

    </div>
  )
}

FeedbackList.propTypes = {
  feedback: PropTypes.array,
}

export default FeedbackList;
