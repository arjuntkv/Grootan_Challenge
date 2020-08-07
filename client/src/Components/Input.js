import React from "react";
import "./Input.css";

class Input extends React.Component {
  //initialize arrayitems and regex for evert inputs
  state = {
    arrayitems: [],
  };

  //initializing arrayitems with value from object
  componentDidMount() {
    this.setState({ arrayitems: this.props.value });
  }

  render() {
    //input Component
    let formData = "";

    //destructuring data
    const { regex, name, value, handleChange } = this.props;

    //checking color input
    if (
      regex.colorCode.test(this.props.value.toString()) ||
      name.toString().toLowerCase().includes("color")
    ) {
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
    else if (
      regex.email.test(this.props.value.toString()) ||
      name.toString().toLowerCase().includes("email")
    ) {
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
    else if (
      regex.url.test(value.toString()) ||
      name.toString().toLowerCase().includes("website")
    ) {
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

    //Default cases like String and number for TEXTBOX
    else if (typeof value === "string" || typeof value === "number") {
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

export default Input;
