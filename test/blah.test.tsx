import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useWhatChanged } from '../src/useWhatChanged';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<div>Hello world</div>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('should be defined', () => {
    expect(useWhatChanged).toBeDefined();
  });
});
