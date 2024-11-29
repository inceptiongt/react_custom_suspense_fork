import React from "react";

export interface SuspenseProps {
  fallback: React.ReactNode;
}

interface SuspenseState {
  pending: boolean;
  error?: any;
}

function isPromise(i: any): i is Promise<any> {
  return i && typeof i.then === "function";
}

export default class Suspense extends React.Component<
  SuspenseProps,
  SuspenseState
> {
  private mounted = false;
  public state: SuspenseState = {
    pending: false,
  };

  public componentDidMount() {
    this.mounted = true;
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public componentDidCatch(err: any) {
    if (!this.mounted) {
      return;
    }

    if (isPromise(err)) {
      this.setState({ pending: true });
      err
        .then(() => {
          this.setState({ pending: false });
        })
        .catch((err) => {
          this.setState({ error: err || new Error("Suspense Error") });
        });
    } else {
      console.log("Suspense throw err");
      throw err;
    }
  }

  public componentDidUpdate() {
    if (this.state.pending && this.state.error) {
      throw this.state.error;
    }
  }

  public render() {
    return this.state.pending ? this.props.fallback : this.props.children;
  }
}
