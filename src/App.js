import React, { Component } from 'react';
import './App.css';
import Output from './Compenents/Output'
import Select from './Compenents/Controls/Select'
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: 'all-meat',
      paras: 5,
      format: "html",
      text: ''
    }
  }

  componentDidMount(){
    this.getSampleText();
  }
  getSampleText(){
    axios
          //https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text
      .get("https://baconipsum.com/api/?type=" + this.state.type + "&paras=" + this.state.paras + '&format=' + this.state.format)
      .then(response => {
        this.setState({ text: response.data}, function() {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App container">
      <h1>ReactJS Sample text Generator</h1>
      <hr />
      <form class='form-inline' >
        <div className='form-group'>
          <label>Include HTML:</label>
        </div>
      </form> 
       <Output value={this.state.text}/>
      </div>
    );
  }
}

export default App;
