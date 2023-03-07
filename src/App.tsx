import {WebContainer} from '@webcontainer/api';
import { useEffect, useRef, useState } from 'react'
import './App.css'
import {createStencilContainer} from './lib/stencil-container';
import { WcContext } from './context/WcContext';
import {useCreateStencilWc} from './hooks/useStencilWc';

function App() {
  const wc = useCreateStencilWc();

  return  (
    wc === null ? (
      <WcContext.Provider value={wc}>
        <div className="App">
        HEY
        </div>
      </WcContext.Provider>
    ) : 'loading...'
  )
}

export default App
