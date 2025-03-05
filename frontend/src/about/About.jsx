import './textstyle.css';
import Navbar from '../components/Navbar';

function About() {
    return (
        <>
            <Navbar />
            <title>
                UFPlanner About
            </title>
            <h1> What is UFplanner? </h1>
            <p>
                UFplanner is a financial planner that provides resources for creating and visualizing adaptive budgets
                specifically aimed toward college students.
            </p>
            <h1> Why UFplanner? </h1>
            <p>
                Each and every student comes from a different financial background which can make it difficult to create
                an "end all be all" budget.
                UFplanner aims to make the budget creation process easier for students by providing budgeting
                suggestions and visualizations while suggesting sensible saving/spending practices.

            </p>
            <h1> How was the idea for UFplanner formed? </h1>
            <p>
                Each member of our team has faced various challenges regarding how to
                manage our finances.
                When planning our Software Engineering final project our team built on this
                issue and theorized a strategy to create a free,
                user-friendly and customizable budget creation tool specifically catered toward college students
                such as ourselves.
            </p>
            <hr className="ahr"></hr>
            <p className="footer">
                <i>Copyright ME :7. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All Rights Reserved.</i>
            </p>
        </>
    );
}

export default About;