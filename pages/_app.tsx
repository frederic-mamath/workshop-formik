import React from "react";
import { compose } from "ramda";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";

import rootReducer from "ducks/root";
import Layout from "components/Layout";

const configureStore = (initialState, options) => {
  const middlewares = [];
  const devtools = [];

  middlewares.push(thunk);

  if (
    typeof window != "undefined" &&
    process.env.REACT_APP_ENVIRONMENT === "local" &&
    window["__REDUX_DEVTOOLS_EXTENSION__"]
  ) {
    devtools.push(window["__REDUX_DEVTOOLS_EXTENSION__"]());
  }

  return createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      ...devtools
    )
  );
};

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(MyApp);
