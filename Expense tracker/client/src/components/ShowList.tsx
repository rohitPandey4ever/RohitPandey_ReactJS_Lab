import React, { useState, useEffect } from "react";
import IDataList from "../modules/IDataList";
import { getItemsData } from "../services/ItemServices";
import '../App.css'
import ExpenseTracker from "./ExpenseTrackerForm";

export default function ShowList() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);


    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const data = await getItemsData();
                console.log(data)
                setItems(data)
                calculateOnItems(data)
            } catch (error: any) {
                console.error(error);
                setError(error)
            }
        }
        fetchItemsData();
    }, [showForm])

    const calculateOnItems = (data: IDataList[]) => {
        let rahulspent: number = 0
        let rameshspent: number = 0
        data.map((item) =>
            item.payeeName === "Rahul"
                ? (rahulspent = rahulspent + item.price)
                : (rameshspent = rameshspent + item.price)
        );
        setRahulSpent(rahulspent);
        setRameshSpent(rameshspent);
        setSum(rahulspent + rameshspent)
    }

    const getTableHeaders = () => {
        return (
            <>
                <>
                    <div className="use-inline date header-color">Date</div>
                    <div className="use-inline header-color">Product Purchased</div>
                    <div className="use-inline price header-color">Price</div>
                    <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
                </>
            </>
        )
    }

    const renderExpense = (expense: IDataList) => {
        return (
            <div key={expense.id}>
                <div className="use-inline date">{expense.setDate}</div>
                <div className="use-inline">{expense.product}</div>
                <div className="use-inline price">{expense.price}</div>
                <div className={`use-inline ${expense.payeeName}`}>{expense.payeeName}</div>
            </div>
        )
    }

    const renderSummary = () => {
        return (
            <>
            <div className="use-inline">Total</div>
            <div className="use-inline total">{sum}</div><br />
            <div className="use-inline">Rahul</div>
            <div className="use-inline total Rahul">{rahulSpent}</div><br />
            <div className="use-inline">Ramesh paid:</div>
            <div className="use-inline total Ramesh">{rahulSpent}</div><br />
            <span className="use-inline payable">{rahulSpent>rameshSpent? "Pay Rahul " : "Pay Ramesh"}</span>
        <span className="use-inline payable price"> {Math.abs((rahulSpent-rameshSpent)/2)}</span>
       
            </>
        )
    }

    return <> 
        <header id="page-Header">Expense Tracker</header>
        <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
        {
           showForm && <div className="form">
            <ExpenseTracker onClose={() => setShowForm(false)} onTrue={undefined}/>
           </div> 
        }
        {getTableHeaders()}
        {items && items.map((expense) => renderExpense(expense))}
        <hr />
        {renderSummary()}
    </>
}
