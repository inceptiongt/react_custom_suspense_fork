import React from "react";

export default class ErrorBoundary extends React.Component {
  state: { err?: any } = {};
  public componentDidCatch(err: any) {
    console.log("catch err", err);
    this.setState({ err });
  }
  render() {
    return this.state.err ? (
      <div>getError: {this.state.err.message}</div>
    ) : (
      this.props.children
    );
  }
}
