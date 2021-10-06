import React, { useReducer } from 'react';

const history = {
  before: [],
  current: '#FF0000',
  after: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'undo': return { after: [state.current, ...state.after], current: state.before[state.before.length - 1], before: state.before.slice(0, -1) };
    case 'redo': return { before: [...state.before, state.current], current: state.after[0], after: state.after.slice(1) };
    case 'record': return { ...state, before: [...state.before, state.current], current: action.payload };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, history);

  return (
    <>
      <button aria-label="undo-button" onClick={() => dispatch({ type: 'undo' })}>undo</button>
      <button aria-label="redo-button" onClick={() => dispatch({ type: 'redo' })}>redo</button>
      <label>Color Picker
        <input aria-label="color-picker" type="color" value={state.current} onChange={({ target }) => dispatch({ type: 'record', payload: target.value })} />
        </label>
      <div aria-label="display" data-testid="test" style={{ backgroundColor: state.current, width: '10rem', height: '10rem' }}></div>
    </>
  );
}

export default App;
