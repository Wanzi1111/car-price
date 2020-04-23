import React from 'react';

import Router from '@/router'
import store from "./store/index";
import {Provider} from "react-redux"
function App() {
  return (
    <Provider store={store}>
    <div className="App">
    <Router />
    </div>
    </Provider>

  );
}

export default App;
