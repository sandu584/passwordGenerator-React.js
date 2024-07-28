import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

	// useState
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState("");

	//useRef
	let passwordRef = useRef(null);

	//password Reference
	const copyToClipBoard = useCallback(() => {
		passwordRef.current?.select();
		// passwordRef.current?.setSelectionRange(0, 3);
		window.navigator.clipboard.writeText(password);
	}, [password]);

	//Generaating the random password
	const passwordGenerator = useCallback(() => {
		let pass = ""; //the actual password
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //from which we are going to select the characters

		if (numberAllowed) str += "0123456789";
		if (charAllowed) str += "`~!@#$%&^*-_+={}[]?";

		for (let i = 1; i <= length; i++) {
			pass += str[Math.floor(Math.random() * str.length)];
		}

		setPassword(pass);

	}, [length, numberAllowed, charAllowed, setPassword]);

	//using useEffect 
	useEffect(() => {
		passwordGenerator();
	}, [length, numberAllowed, charAllowed, passwordGenerator]);

	//returning the JSX
	return (
		// outer div to center the password box
		<div className='w-full h-screen flex justify-center items-center'>

			{/* the actual password box */}
			<div className='text-center p-10 text-3xl w-3/5 rounded-lg h-auto m-auto bg-gray-800 border text-orange-600'>

				{/* heading */}
				<h1 className='font-semibold text-white'>Password Generator</h1>

				{/* input box and button to copy */}
				<div className='flex justify-center items-center flex-wrap md:flex-nowrap'>
					<input
						type="text"
						className='w-full my-8  py-3 px-3 text-black font-semibold'
						value={password}
						placeholder='Password will generated here!'
						readOnly
						ref={passwordRef}
						style={{ borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}
					/>
					<button
						className='text-2xl px-3 py-3.5  hover:bg-blue-600 hover:text-white bg-blue-600 text-black font-semibold'
						onClick={copyToClipBoard}
						style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
					>COPY</button>
				</div>

				{/* range and checkbox for numbers & special characters */}
				<div className='flex text-xl gap-x-2 font-semibold flex-wrap'>

					{/* input range */}
					<div className='flex items-center gap-x-1'>
						<input
							type="range"
							min={6}
							max={100}
							value={length}
							className='cursor-pointer'
							onChange={(e) => { setLength(e.target.value) }}
						/>
						<label htmlFor="">Length : {length}</label>
					</div>

					{/* input checkbox for numbers */}
					<div className="flex items-center gap-x-1">
						<input type="checkbox"
							defaultChecked={numberAllowed}
							id="numberInput"
							onChange={() => {
								setNumberAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="numberInput">Numbers</label>
					</div>

					{/* input checkbox for special characters */}
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={charAllowed}
							id="characterInput"
							onChange={() => {
								setCharAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="characterInput">Characters</label>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App;