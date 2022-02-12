import { FaTimes, FaEdit } from "react-icons/fa";
import { useContext} from "react";
import FeedbackContext from "../context/FeedbackContext";
import PropTypes from "prop-types";
import Card from "./shared/Card";

function FeedbackItem({item}) {

  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

{/* We use the card component to style the card of the feedback as well as the card for entering feedback */}

  return (
    <Card reverse={false}>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => deleteFeedback(item.id)} className="close"><FaTimes color="purple"/></button>
      <button onClick={() => editFeedback(item)} className="edit"><FaEdit color="purple" /></button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem
