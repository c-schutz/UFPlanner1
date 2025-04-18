import './textstyle.css';
import Navbar from '../components/Navbar';

function About() {
    return (
        <>
            <Navbar />
            <title>
                UFinancial About
            </title>
            <div className='section'>
                <h1 className='h11'> What is UFinancial? </h1>
                <p>
                    UFinancial is a financial planner that provides resources for creating and visualizing adaptive budgets
                    specifically aimed toward college students.
                </p>
            </div>
            <div className='section'>
                <h1 className='h12'> Why UFinancial? </h1>
                <p>
                    Each and every student comes from a different financial background which can make it difficult to create
                    an "end all be all" budget.
                    UFinancial aims to make the budget creation process easier for students by providing budgeting
                    suggestions and visualizations while suggesting sensible saving/spending practices.

                </p>
            </div>
            <div className='section'>
                <h1 className='h13'> How was the idea for UFinancial formed? </h1>
                <p>
                    Each member of our team has faced various challenges regarding how to
                    manage our finances.
                    When planning our Software Engineering final project our team built on this
                    issue and theorized a strategy to create a free,
                    user-friendly and customizable budget creation tool specifically catered toward college students
                    such as ourselves.
                </p>
            </div>
            <hr className="ahr"></hr>
            <p className="footer">
                <i>Copyright ME :7. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All Rights Reserved.</i>
            </p>
        </>
    );
}

export default About;