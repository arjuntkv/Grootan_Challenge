import React from "react";
import "./App.css";
import Data from "./data.json";
import InputList from "./Components/InputList";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//another method
import NewList from "./Components/new/newList";

class App extends React.Component {
  state = {
    data: Data,
    main: Data,
    title: "",
    subTitle: "",
    regex: {
      colorCode: /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i,
      email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      url: /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g,
      number: /^[1-9]\d*$/,
      time: /^([1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)?$/i,
      date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
    },
    current: true,
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

  handleLink = () => {
    this.setState({
      current: !this.state.current,
    });
  };

  //Simple Form Validation before submitting form
  checkAllInputsAreFilled = () => {
    let result = true;

    Object.keys(this.state.main).forEach((key, index) => {
      if (this.state.main[key].length <= 0) {
        result = false;
      }
    });
    return result;
  };

  //handle Form Submission
  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.checkAllInputsAreFilled()) {
      //Saving to db
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const res = await axios.post("/", this.state.main, config);
        console.log("status: ", res.status);
        console.log("data: ", res.data);

        alert("Saved to DB successfully");
      } catch (err) {
        alert("Something went wrong");
        console.log(err);
      }
    } else {
      alert("Enter all fields");
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="titles">
            <h1 className="newLink">
              {this.state.title}{" "}
              <div>
                {/* Either we can use first method or second Method */}
                {this.state.current ? (
                  <Link to="/new" className="Link" onClick={this.handleLink}>
                    Go to Second Method =>
                  </Link>
                ) : (
                  <Link to="/" className="Link" onClick={this.handleLink}>
                    Go to First Method =>
                  </Link>
                )}
              </div>
            </h1>
            <h3>{this.state.subTitle}</h3>
          </div>

          <Switch>
            <Route exact path="/">
              <div>
                <InputList
                  main={this.state.main}
                  handleChange={this.handleChange}
                  regex={this.state.regex}
                />
              </div>
            </Route>
            <Route exact path="/new">
              <div>
                <NewList
                  main={this.state.main}
                  handleChange={this.handleChange}
                  regex={this.state.regex}
                />
              </div>
            </Route>
          </Switch>

          <button className="btn" type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </Router>
    );
  }
}

export default App;
