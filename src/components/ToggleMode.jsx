import React, { Component } from "react";

export default class ToggleMode extends Component {
  constructor() {
    super();
    if (JSON.parse(localStorage.getItem("DARK_MODE")) === true) {
      document.body.classList.add("dark-mode");
    }

    this.state = {
      darkMode: JSON.parse(localStorage.getItem("DARK_MODE")),
    };

    this.handleModeChange = this.handleModeChange.bind(this);
  }

  componentDidMount() {
    const theme = localStorage.getItem("DARK_MODE");
    if (theme === "true") {
      document.querySelector(".toggle-theme").classList.add("active");
    }
  }

  handleModeChange() {
    document.querySelector(".toggle-theme").classList.toggle("active");

    if (!this.state.darkMode) {
      document.body.classList.add("dark-mode");
      document
        .querySelector(".header-container")
        .classList.add("dark-mode-header");
    } else {
      document.body.classList.remove("dark-mode");
      document
        .querySelector(".header-container")
        .classList.remove("dark-mode-header");
    }

    this.setState({
      darkMode: !this.state.darkMode,
    });
    localStorage.setItem("DARK_MODE", !this.state.darkMode);
  }

  render() {
    return (
      <div className="toggle-theme" onClick={() => this.handleModeChange()}>
        <div className="toggle-theme-icon">🌜</div>
        <div className="toggle-theme-icon">🌞</div>
        <div className="toggle-theme-circle"></div>
      </div>
    );
  }
}
