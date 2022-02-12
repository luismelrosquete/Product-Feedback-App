import { v4 as uuidv4 } from "uuid";
import {createContext, useState} from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    // This useState has the default feedback. 

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This item is from context",
            rating: 10,
        }
    ])

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    }

    const deleteFeedback = (id) => {
        if(window.confirm("Are you sure you want to delete?")) {
          setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    // The feedback will be passed over as a value for the components that need it.
    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;