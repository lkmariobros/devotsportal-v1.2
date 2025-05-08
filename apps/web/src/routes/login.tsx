import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

// Use a class component to avoid React 19 hook issues
class LoginComponent extends React.Component<{}, { showSignIn: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showSignIn: false
    };
  }

  render() {
    return this.state.showSignIn ? (
      <SignInForm onSwitchToSignUp={() => this.setState({ showSignIn: false })} />
    ) : (
      <SignUpForm onSwitchToSignIn={() => this.setState({ showSignIn: true })} />
    );
  }
}

// Wrapper function component
function RouteComponent() {
  return <LoginComponent />;
}
