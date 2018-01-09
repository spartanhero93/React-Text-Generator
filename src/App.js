import React, { Component } from 'react';
import Output from './Components/Output';
import Select from './Components/Controls/Select';
import Text from './Components/Controls/Text';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "all-meat",
      paras: 1,
      format: "html",
      text: ""
    };
  }

  componentDidMount() {
    this.getSampleText();
  }
  getSampleText() {
    axios
      //https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text
      .get(
        "https://baconipsum.com/api/?type=" +
          this.state.type +
          "&paras=" +
          this.state.paras +
          "&format=" +
          this.state.format
      )
      .then(response => {
        this.setState({ text: response.data }, function() {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  changeType(x) {
    this.setState({ format: x }, this.getSampleText);
  }
  changeParas(number) {
    this.setState({ paras: number }, this.getSampleText);
  }

  render() {
    return <div className="App container">
        <h1 className="text-center">ReactJS Ipsum Generator (bacon)</h1>
        <hr />
        <form className="form-inline">
          <div className="form-group">
            <label>Pragraph amount: </label>
            <Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
          </div>
          <div className="form-group">
            <label>Format:</label>
            <Select value={this.state.format} onChange={this.changeType.bind(this)} />
          </div>
        </form>
        <br />
        <br />
        <Output value={this.state.text} />
      </div>;
  }
}

export default App;
