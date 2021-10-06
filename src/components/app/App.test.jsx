import React from 'react';
import App from './App.jsx';
import { fireEvent, screen, render } from '@testing-library/react';


describe('lab test chain', () => {
  it('chain test!', () => {
    render(<App />);
    const undo = screen.getByText('undo');
    const redo = screen.getByText('redo');
    const input = screen.getByLabelText('Color Picker');
    const para = screen.getByTestId('test');

    fireEvent.change(input, { target: { value: '#FF0000' } }); //red
    expect(para).toHaveStyle({ backgroundColor: '#FF0000' });
    fireEvent.change(input, { target: { value: '#0000FF' } });//blue
    expect(para).toHaveStyle({ backgroundColor: '#0000FF' });
    fireEvent.change(input, { target: { value: '#00FF00' } }); //green
    expect(para).toHaveStyle({ backgroundColor: '#00FF00' });
    fireEvent.click(undo); //undo to blue
    expect(para).toHaveStyle({ backgroundColor: '#0000FF' });
    fireEvent.click(undo); //undo to red
    expect(para).toHaveStyle({ backgroundColor: '#FF0000' });
    fireEvent.click(redo); //redo to blue
    expect(para).toHaveStyle({ backgroundColor: '#0000FF' });
    fireEvent.change(input, { target: { value: '#FFFF00' } }); //yellow
    expect(para).toHaveStyle({ backgroundColor: '#FFFF00' });
    fireEvent.click(undo); //undo to blue
    expect(para).toHaveStyle({ backgroundColor: '#0000FF' });
    fireEvent.click(undo); //undo to red
    expect(para).toHaveStyle({ backgroundColor: '#FF0000' });
    fireEvent.click(redo); //redo to blue
    expect(para).toHaveStyle({ backgroundColor: '#0000FF' });
    fireEvent.click(redo); //redo to yellow
    expect(para).toHaveStyle({ backgroundColor: '#FFFF00' });
    fireEvent.click(redo); //redo to green
    expect(para).toHaveStyle({ backgroundColor: '#00FF00' });
  });
});
