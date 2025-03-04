import "./bstyles.css";

function Budget() {
    return (
        <>
            <title> UFPlanner Budget </title>
            <p className="btitle"> Here you can create your own budgets! </p>
                <hr className="bhr"></hr>
                <button className="new-budget-button">
                    <span>+</span>
                    New Budget
                </button>
        </>
    );
}

export default Budget;