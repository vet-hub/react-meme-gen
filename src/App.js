import './App.css';
import {useState, useEffect} from 'react';

function App() {
	return (
	<div className="App">


		<MyMeme />







		
{/* 
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>
		</header>
 */}
 
	</div>
	);
}

export default App;


function MyMeme(){

	const [data, setData] = useState( null );
	const [idx, setIdx] = useState( 0 );
	const [inputText0, setInputText0] = useState('my Text 1');
	const [inputText1, setInputText1] = useState('my Text 2');


	const [ loading, setLoading ] = useState( true );
	const [ error, setError ] = useState( null );

	const memeUrl = 'https://api.imgflip.com/get_memes';

	useEffect( ()=>{ 
		fetch( memeUrl )
			.then( (response) => {
					if( response.ok ) { return response.json(); }
					throw response;
			})
			.then( (resData) => { 
				setData( resData.data );
			})
			.catch( (error) => {  
					console.error( 'Error fetching:', error );
					setError( error );						
			});
	}, [ ] )

	data && console.log('memeData:', data);
	data && console.log('memeData[0].id:', data.memes[0].id);
	data && console.log('memeData[0].name:', data.memes[0].name);
	data && console.log('memeData[0].url:', data.memes[0].url);

	function getRandomImage() {
		const randomMemeIndex = Math.floor(Math.random() * data?.memes.length);
		setIdx(randomMemeIndex);
  	}
	

	const objToParam = (obj) => {
		const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
		return '?' + params.join('&')
	}



	return (
	<>
		
		
		<h1>Meme Gen</h1>
		<h2>{ data?.memes[idx].name }</h2>
		<h3>{ data?.memes[idx].id }</h3>

		<button onClick={getRandomImage}>
			Change meme image
		</button>

		<form 
			onSubmit={async e => {
				e.preventDefault();
				const params = {
					template_id: data.memes[idx].id,
					username: process.env.REACT_APP_IMGFLIP_USERNAME,
					password: process.env.REACT_APP_IMGFLIP_PASSWORD,
					text0: inputText0,
					text1: inputText1
				}
				const response = await fetch(`https://api.imgflip.com/caption_image${objToParam(params)}`, { 
					method: "POST"
				 })
				const mydata = await response.json();
				console.log(mydata);

			}}			
		>


			<input className='inputText0' type="text" name="inputText0" id="inputText0" 
				value={inputText0}
				onChange={ e => { setInputText0(e.target.value) } }
			/>			

			<input className='inputText1' type="text" name="inputText1" id="inputText1" 
				value={inputText1}
				onChange={ e => { setInputText1(e.target.value) } }
			/>

			<button type='submit'>new meme</button>

		</form>


		<div className='memeContainer'>
			<div className='texts memeText0'>{inputText0}</div>
			<img src={data?.memes[idx].url} alt={data?.memes[idx].name} />
			<div className='texts memeText1'>{inputText1}</div>
		</div>

	</>
	)
}


/* 

			<input type="text" name="inputUp" id="inputUp" 
				onChange={ (e) => setToDoForm( { ...toDoForm, [e.target.name]: e.target.value } ) }
			/>
*/