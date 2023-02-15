import { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [steps, setSteps] = useState([])
    async function handleSubmit() {
        try {

            let arr = []
            const result = await axios.post("http://localhost:8000/", { num1, num2 })
            const resultArray = Object.entries(result.data.data).map(([key, value]) => [key, value.carryString, value.sumString]);
            setSteps(resultArray)

        } catch (error) {
            toast(error.response.data.message)
        }
    }

    useEffect(() => {
        console.log(steps)
    }, [steps])
    return (
        <div className="App">
            <div className="navbar">
                <h1>Step Addition</h1>
            </div>
            <div className="container">
                <div className="user-input">
                    <label htmlFor="num1">First Number:</label><input value={num1} className="input-num1" type="number" name="num1" onChange={(e) => setNum1(e.target.value)} />
                </div>
                <div className="user-input">
                    <label htmlFor="num2">Second Number:</label><input value={num2} className="input-num2" type="number" name="num2" onChange={(e) => setNum2(e.target.value)} />
                </div>
                <button onClick={handleSubmit}>Generate Steps</button>
                <div className="json-outline">
                    <div className='json-inner'>
                        <p className="brace">{"{"}</p>
                        {
                            steps?.map((step, i) => (
                                <div key={i} className="steps">
                                    <p className="step-key">{`"${step[0]}"`} </p>
                                    <p style={{ color: "yellow" }}>: {`{"carryString": `}</p>
                                    <p style={{ color: "#876549" }}>{`"${step[1]}", `}</p>
                                    <p style={{ color: "yellow" }}>: {`"sumString": `}</p>
                                    <p style={{ color: "#876549" }}>{`"${step[2]}" `}</p>
                                    <p style={{ color: "yellow" }}>{"},"}</p>
                                </div>
                            ))
                        }
                        <p className="brace" style={{ marginTop: "-1rem" }}>{"}"}</p>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default App;