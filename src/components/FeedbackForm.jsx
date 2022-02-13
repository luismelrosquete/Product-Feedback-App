import { useState, useContext, useEffect } from "react";
import RatingSelect from "./RatingSelect";
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {

    const [text, setText] = useState("");
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState("");

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);
    // we will use feedbackEdit which has the edit boolean value and the item id to be edited.

    // the code will be executed when the edit button is clicked in any item
    useEffect(() => {
        if (feedbackEdit.edit) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]) // if we leave this blank, useEffect will load as soon as the page loads which could be helpful when pulling data using an API

    // we are using (e) or event so that we can tap into the text being typed in live

    const handleTextChange = (e) => {

        {/* 
            
            IF the text is empty, then disable the button.  
            IF the text is not empty but less than 10 characters, then disable the button.
            Otherwise, enable the button.
        
        */}
        
        if (text === "") {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text != "" && text.trim().length <= 10 ) {
            setMessage("Text must be at least 10 characters.");
            setBtnDisabled(true);
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }

        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            }

            if (feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
            } else {
                addFeedback(newFeedback);
            }
            setBtnDisabled(true);
            setRating(10);
            setText("");
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input 
                        onChange={handleTextChange}
                        value={text}
                        type="text" 
                        placeholder="Write a review" 
                    />
                    <Button type="submit" isDisabled={btnDisabled}>Send</Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm;