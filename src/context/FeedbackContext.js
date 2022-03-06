import {createContext, useState, useEffect} from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    // This useState has the default feedback. 

    const [isLoading, setIsLoading] = useState(true);

    const [feedback, setFeedback] = useState([]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback();
    }, [])

    // Get Data from API

    const fetchFeedback = async () => {
        const response = await fetch("/feedback?_sort=id&_order=desc");
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
    }

    // Add Feedback

    const addFeedback = async (newFeedback) => {

        const response = await fetch("/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFeedback)
        })
        const data = await response.json();
        console.log(newFeedback);
        setFeedback([data, ...feedback]);
    }

    // Delete feedback    
    const deleteFeedback = async (id) => {
        if(window.confirm("Are you sure you want to delete?")) {
          await fetch(`/feedback/${id}`, { method: "DELETE"})
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

    const updateFeedback = async (id, updateItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateItem)
        })

        const data = await response.json();

        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data} : item))

        setFeedbackEdit({
            item: {},
            edit: false,
        });
    }

    // The feedback will be passed over as a value for the components that need it.

    // feedbackEdit = the piece of state || editFeedback = the function
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;