import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import UploadComponent from './uploadfile'; 
import PiechartProcess from './piechartProcess';
import Home from './homepage';
import AllFiles from './allFiles';

function App() {
  return (
    <div>
      {/* <AllFiles /> */}
      <BrowserRouter>
        {/* <AllFiles /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/upload" component={UploadComponent } />
          <Route path="/allFiles" component={AllFiles} />
          <Route path="/charts/:textData" component={PiechartProcess } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;