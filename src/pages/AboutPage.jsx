import Card from "../components/shared/Card";
import {Link} from "react-router-dom";

function AboutPage() {
    return (
        <Card>
            <div className="about">
                <h1>About This Project</h1>
                <p>This is a React app to leave feedback for a product or service. In this project, I was able to practice my knowledge on several concepts of React, including but not limited to:</p>
                <ul className="reactConceptsList">
                    <li>Components</li>
                    <li>JSX</li>
                    <li>Props (propTypes, defaultProps)</li>
                    <li>State (Component, App Level)</li>
                    <li>Handling Events</li>
                </ul>
                <p><strong>More About State: </strong> I initially started working with component state but then realized that I could use global state to avoid repitition of code.</p>
                <p><strong>Version:</strong> 1.0.0</p>
                <p><Link to="/">Back To Home</Link></p>
            </div>
        </Card>
    )
}

export default AboutPage;