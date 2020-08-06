import React from "react";
import "./App.css";
import Data from "./data.json";
import Input from "./Components/Input";
import axios from "axios";

class App extends React.Component {
  state = {
    data: Data,
    main: Data,
    title: "",
    subTitle: "",
    regex: {
      colorCode: /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i,
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      url: /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g,
    },
  };

  //used to extract both TITLE and SUBTITLE
  componentDidMount() {
    this.extractTitles();
    // this.simple();
  }

  // simple = () => {
  //   Object.keys(this.state.data).forEach((key) => {
  //     const da = key.toString();
  //     this.setState((prevState) => ({
  //       data: {
  //         ...prevState.data,
  //         [da]: "",
  //       },
  //     }));
  //   });
  // };

  extractTitles = () => {
    if ("Title" in this.state.main)
      this.setState({ title: this.state.main["Title"] });

    if ("Sub Title" in this.state.main)
      this.setState({ subTitle: this.state.main["Sub Title"] });
  };

  //for handling value change in inputs
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({
      main: {
        ...prevState.main,
        [name]: value,
      },
    }));
  };

  //Simple Form Validation before submitting form
  checkAllInputsAreFilled = () => {
    return true;
  };

  //handle Form Submission
  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.checkAllInputsAreFilled()) {
      console.log(this.state.main);

      //Saving to db
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      // try {
      //   const res = await axios.post("/", this.state.main, config);

      //   console.log("Saved to DB successfully");
      // } catch (err) {
      //   console.log(err);
      // }
    }
  };

  render() {
    return (
      <div className="App">
        <div className="titles">
          <h1>{this.state.title}</h1>
          <h3>{this.state.subTitle}</h3>
        </div>

        {Object.keys(this.state.main).map((key, index) => (
          <Input
            key={index}
            name={key}
            value={this.state.main[key]}
            handleChange={this.handleChange}
            regex={this.state.regex}
          />
        ))}

        <button className="btn" type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default App;
