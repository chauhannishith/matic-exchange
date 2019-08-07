import React from 'react';
import EthDAIExchangePage from './pages/ethdaiexchange'
import Deposit from './pages/deposit'
import './App.css';
import { Elemental } from 'react-elemental';
import {
  karlaBold,
  karlaRegular,
  sourceCodeProMedium,
  sourceCodeProRegular,
} from 'react-elemental-fonts';

function App() {
  return (
    <Elemental
      fontOpts={{
        primary: {
          regular: karlaRegular,
          bold: karlaBold,
        },
        secondary: {
          regular: sourceCodeProRegular,
          bold: sourceCodeProMedium,
        },
      }}
    >
      <div className="App">
        {/* <EthDAIExchangePage /> */}
        <Deposit />
      </div>
    </Elemental>
  );
}

export default App;
