import React from 'react';
import Express from 'express'
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './src/root/index.jsx';
import rootReducer from './src/reducers';

var port = 8080;
var app = Express();

app.get('/dist/bundle.js', function (req, res) {
  res.sendFile(__dirname + '/dist/bundle.js');
});

app.get('/dist/bundle.js.map', function (req, res) {
  res.sendFile(__dirname + '/dist/bundle.js.map');
});

app.get(/(?!dist)\/bundle.js$/, function (req, res) {
  res.redirect('/dist/bundle.js')
});

app.get(/^(?!$|bundle.js$)/, function (req, res) {
  const store = createStore(rootReducer);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
});

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app-container">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, function () {
  console.log('Listening on port 8080!');
});
