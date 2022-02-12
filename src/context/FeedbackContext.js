import { v4 as uuidv4 } from "uuid";
import {createContext, useState} from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    // This useState has the default feedback. 

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This is feedback item 1",
            rating: 10,
        },
        {
            id: 2,
            text: "This is feedback item 2",
            rating: 9,
        },
        {
            id: 3,
            text: "This is feedback item 3",
            rating: 7,
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Add Feedback

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        console.log(newFeedback);
        setFeedback([newFeedback, ...feedback]);
    }

    // Delete feedback    
    const deleteFeedback = (id) => {
        if(window.confirm("Are you sure you want to delete?")) {
          setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    // Set item to be edited. 

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // Set item to be edited. 

    const updateFeedback = (id, updateItem) => {
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updateItem} : item))
    }

    // The feedback will be passed over as a value for the components that need it.

    // feedbackEdit = the piece of state || editFeedback = the function
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;