import React from "react";
import ReactDOM from "react-dom";
import { addons, types } from "@storybook/addons";
import { IconButton, Icons } from "@storybook/components";
import "!style-loader!css-loader!./dropdown-style.css";


window.ListenerThemeChange = null;

class Portal extends React.Component {
  container = document.createElement("div");
  componentDidMount() {
    this.container.setAttribute("data-dropdown", "true");
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.container);
  }
}

class DropdownTheme extends React.Component {
  refButton = React.createRef();

  get rect() {
    const current = this.refButton.current;
    if (!current) {
      return { left: 0, top: 0, width: 0, height: 0 };
    }
    return this.refButton.current.getBoundingClientRect();
  }

  changeTheme(choice) {
    if (window.ListenerThemeChange) {
      window.ListenerThemeChange(choice.theme);
      this.setState({
        activeTheme: choice.title,
        open:false
      });
    }
  }

  render() {
    const ThemesChoices = [
      {title: "dark",theme : {color: "#fff",bg:"#333"}},
      {title: "light",theme : {color: "#333",bg:"#fff"}},
    ];
    const List = ThemesChoices.map(choice => (
      <li
        key={choice.title}
        className={choice.title === this.state.activeTheme ? "active" : undefined}
        onClick={this.changeTheme.bind(this, choice)}
      >
        {choice.title}
      </li>
    ));
    const buttonRect = this.rect;
    const top = buttonRect.top + buttonRect.height;
    const left = buttonRect.left - buttonRect.width / 2;
    return (
      <React.Fragment>
        <IconButton
          ref={this.refButton}
          active={this.state.open}
          onClick={this.toggleActive.bind(this)}
        >
          <Icons icon="book" />
        </IconButton>
        <Portal>
          <ul
            className={"dropdown-theme"}
            style={{ top: top + "px", left: left + "px" }}
          >
            {this.state.open ? List : undefined}
          </ul>
        </Portal>
      </React.Fragment>
    );
  }

  state = {
    activeTheme: '',
    open: false
  };

  toggleActive() {
    this.setState({ open: !this.state.open });
  }
}
const NAME = "Theme";
addons.register(NAME, () => {
  addons.add(NAME, {
    title: "Theme change",
    type: types.TOOL,
    // match: ({ viewMode }) => viewMode === "story",
    render: () => <DropdownTheme />
  });
});
