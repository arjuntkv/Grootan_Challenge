import React from "react";

class New extends React.Component {
  //initialize arrayitems and regex for evert inputs
  state = {
    arrayitems: [],
    type: "string",
  };

  //initializing arrayitems with value from object
  componentDidMount() {
    this.setState({ arrayitems: this.props.value });
    this.setTypesForInput();
  }

  //Initializng types for input
  setTypesForInput = () => {
    if (this.props.regex.email.test(this.props.value.toString())) {
      this.setState({ type: "email" });
    } else if (this.props.regex.colorCode.test(this.props.value.toString())) {
      this.setState({ type: "colorCode" });
    } else if (this.props.regex.url.test(this.props.value.toString())) {
      this.setState({ type: "url" });
    } else if (this.props.regex.number.test(this.props.value.toString())) {
      this.setState({ type: "number" });
    } else if (this.props.regex.time.test(this.props.value.toString())) {
      this.setState({ type: "time" });
    } else if (this.props.regex.date.test(this.props.value.toString())) {
      this.setState({ type: "date" });
    }
  };

  render() {
    //input Component
    let formData = "";

    //destructuring data
    const { name, value, handleChange } = this.props;

    //checking color input
    if (this.state.type === "colorCode") {
      formData = (
        <div className="flex">
          <label className="label" htmlFor={name}>
            {name}
          </label>
          <input
            className="input"
            id={name}
            type="color"
            name={name}
            value={value}
            onChange={handleChange}
          />
        </div>
      );
    }

    //checking email
    else if (this.state.type === "email") {
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            type="email"
            name={name}
            value={value}
            onChange={handleChange}
          />
        </div>
      );
    }

    //checking website url address
    else if (this.state.type === "url" || value.toString() === "url") {
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            type="url"
            name={name}
            value={value}
            onChange={handleChange}
          />
        </div>
      );
    }
    //checking time
    else if (
      this.state.type === "time" ||
      name.toString().toLowerCase().includes("time") ||
      value.toString().includes("AM") ||
      value.toString().includes("PM")
    ) {
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            type="time"
            name={name}
            value={value}
            onChange={handleChange}
          />
        </div>
      );
    }
    //checking date
    else if (
      this.state.type === "date" ||
      name.toString().toLowerCase().includes("dob") ||
      value.toString().includes("dd") ||
      value.toString().includes("yyyy")
    ) {
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            type="date"
            name={name}
            value={value}
            onChange={handleChange}
          />
        </div>
      );
    }

    //checking Gender
    else if (
      name.toString().toLowerCase().includes("gender") ||
      value.toString().includes("male")
    ) {
      const radioBoxItems = this.state.arrayitems.toString().split("/");
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>
          <div className="genderDiv">
            {radioBoxItems.map((item, index) => (
              <div key={index}>
                <label htmlFor={item}>{item}</label>
                <input
                  id={item}
                  type="radio"
                  name={name}
                  value={item}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    //checking Range Slider
    else if (
      name.toString().toLowerCase().includes("cgpa") ||
      value.toString().includes("-")
    ) {
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            type="range"
            min={0}
            max={10}
            name={name}
            value={value}
            onChange={handleChange}
            step="1"
          />
        </div>
      );
    }

    //checking Image
    else if (
      name.toString().toLowerCase().includes("photo") ||
      value.toString().includes("png")
    ) {
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            type="file"
            accept="image/*"
            name={name}
            onChange={handleChange}
          />
        </div>
      );
    }

    //selecting country
    else if (
      name.toString().toLowerCase().includes("country") ||
      typeof value === "object"
    ) {
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>

          <select
            name={name}
            value={typeof value === "object" ? value[0] : value}
            onChange={handleChange}
          >
            {this.state.arrayitems.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      );
    }

    //Languages Known [Splitting based on both "," and " "]["and" is filtered]
    else if (name.toString().toLowerCase().includes("languages")) {
      const selectItems = this.state.arrayitems
        .toString()
        .split(/(?:,| )+/)
        .filter((item) => item !== "and");

      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>

          <select name={name} value={value} onChange={handleChange}>
            {selectItems.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      );
    }

    //checking for title and subtitle and skipping them both
    else if (
      name.toString().toLowerCase() === "title" ||
      name.toString().toLowerCase() === "sub title"
    ) {
    }

    //checking number
    else if (typeof value === "number" || this.state.type === "number") {
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            type="number"
            name={name}
            value={value}
            onChange={handleChange}
          />
        </div>
      );
    }

    // //Default cases like String for TEXTBOX
    else if (typeof value === "string" || this.state.type === "string") {
      formData = (
        <div className="flex">
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
          />
        </div>
      );
    } else {
      formData = <div>Error</div>;
    }

    return <div>{formData}</div>;
  }
}

export default New;
