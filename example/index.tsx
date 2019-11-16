import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useWhatChanged from '../.';
import './styles.css';

function Child1(props) {
  const { c, d } = props;
  useWhatChanged([c, d], 'c, d');
  React.useEffect(() => {}, [c, d]);

  return (
    <div className="child1">
      <span>CHILD 1</span>
      <span>Value c: {c}</span>
      <span>Value d: {d}</span>
    </div>
  );
}

function Child2(props) {
  const { a } = props;
  React.useEffect(() => {}, [a]);

  return (
    <div className="child2">
      <span>CHILD 2</span>
      <span>Value a: {a}</span>
    </div>
  );
}

function App() {
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  const [c, setC] = React.useState(0);
  const [d, setD] = React.useState(0);

  const t = { a: 1 };

  useWhatChanged([a, b, c, d], 'a, b, c, d');

  React.useEffect(() => {
    // console.log("some thing changed , need to figure out")
  }, [a, b, c, d]);
  return (
    <div className="container">
      <h1 className="title">Click to change values and see logs</h1>
      <div
        style={{
          fontSize: '30px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        <span className="cr_value">a: {a}</span>
        <span className="cr_value">b: {b}</span>
        <span className="cr_value">c: {c}</span>
        <span className="cr_value">d: {d}</span>
      </div>
      <div>
        <button
          className="action-btn"
          onClick={() => {
            setA(a + 1);
          }}
        >
          Change A
        </button>
        <button
          className="action-btn"
          onClick={() => {
            setA(a + 1);
            setB(b + 1);
          }}
        >
          Change A & B
        </button>
        <button
          className="action-btn"
          onClick={() => {
            setA(a + 1);
            setD(d + 1);
          }}
        >
          Change A & D
        </button>
      </div>
      <div>
        <button
          className="action-btn"
          onClick={() => {
            setC(c + 1);
          }}
        >
          Change C
        </button>
        <button
          className="action-btn"
          // style={{
          //   background: 'linear-gradient(15deg,#14af83,#15b89a)',
          // }}
          onClick={() => {
            setB(b + 1);
            setC(c + 1);
          }}
        >
          Change B & C
        </button>
      </div>

      <div style={{ display: 'flex' }}>
        <Child1 c={c} d={d}></Child1>
        <Child2 a={a}></Child2>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
