import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

interface Data {
	id: string;
	data: string;
	processed: boolean;
}

function App() {
	let [results, setResults]: [
		Data[],
		React.Dispatch<React.SetStateAction<any[]>>
	] = useState([]);

	const apiCaller = async (url: string) => {
		try {
			const res: any = await axios.get(`http://localhost:5000/${url}`);
			if (res?.data.length) await setResults(() => [...res?.data]);
			else setResults(() => [res?.data]);
		} catch (err) {
			console.error({ err });
		}
	};

	return (
		<div className="App">
			<div className="split left">
				<div className="centered">
					<header className="">
						<img src={logo} className="App-logo" alt="logo" />
					</header>
					<div className="button-group">
						<button
							onClick={() => apiCaller("requestImageProcess")}
							className="button">
							Request Image
						</button>
						<button onClick={() => apiCaller("processData")} className="button">
							process data
						</button>
						<button onClick={() => apiCaller("results")} className="button">
							get processed results
						</button>
					</div>
				</div>
			</div>

			<div className="split right">
				<div className="centered">
					{results.length === 1 ? (
						<div>image created for processing </div>
					) : (
						<ul>
							{results.map(result => (
								<li key={result.id}>{result.data}</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
