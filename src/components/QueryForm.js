import React,{ Component } from 'react'; 
import '../css/QueryForm.css'; 

class QueryForm extends Component { 
	constructor(props){ 
		super(props); 
		this.state = { 
			value: '', 
			submit_disabled: true, 
			sentiment: ''
		}
	}

	handleChange = (event) => { 
		this.setState({value: event.target.value}); 
		if(event.target.value.trim() !== '' ){ 
			this.setState({
				submit_disabled:false
			}); 
		} else { 
			this.setState({
				submit_disabled:true, 
				sentiment: ''
			});
		}
	}

	fetchSentiment =()=> { 
		fetch('http://localhost:5000/sentilize', { 
			method: 'POST', 
			header: {'Access-Control-Allow-Origin': '*'}, 
			body: JSON.stringify({ 
				sentence: this.state.value
			})
		})
		.then(response => response.json())
		.then(responseJSON =>{ 
			this.setState({ sentiment: responseJSON.sentiment});  
		})
		.catch(error => { 
			console.log(error); 
		}); 
	}

	render() {
		const {value, submit_disabled, sentiment} = this.state;
		return (
			<div className='query-page-wrapper'>
				<h1 className='page-heading'> Sentilizer Welcomes you :) </h1>
				<div className='query-form-wrapper'> 
					<label> Enter text to analayze its sentiment </label> 
					<textarea 
						id='sentiment'
						value = {value}
						onChange ={this.handleChange}
					/>
					<button 
						type='button' 
						disabled ={submit_disabled}
						onClick = {this.fetchSentiment}
					>
						Submit
					</button> 
				</div> 
				{sentiment!==''? (
						<div className='response-wrapper'> 
							<h3>Sentiment:</h3>
							<div className='response-text'> {sentiment} </div>
						</div>
					): ''
				}
			</div> 
		); 
	}
}

export default QueryForm; 