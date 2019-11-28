# use-what-changed

<h2 align="center">A simple hook to debug major Reactjs hooks and custom hooks.</h2>
<p align="center">
    <img src="https://badgen.net/npm/v/@simbathesailor/use-what-changed">
    <img src="https://badgen.net/bundlephobia/minzip/@simbathesailor/use-what-changed">
    <img src="https://badgen.net/npm/dw/@simbathesailor/use-what-changed">
</p>

<p  align="center"><img  src="demoimages/cover.png"  width="500"  align="center"></p>

## Install

If you use yarn. Run

```sh
yarn add @simbathesailor/use-what-changed
```

If you use npm. Run

```
npm i @simbathesailor/use-what-changed --save
```

## Motivation

I have been working on hooks for quite a long time. I use react hooks every day in my open source projects and also at work.

Now, using useEffect, useCallback, useMemo have really helped me compose the logic well together. But when the dependency list gets long. When I say long , it can be any thing greater than 3 for me and can be more or less for others.

With these large dependency array, I found it really difficult to debug and find out what is causing my useEffect to run again( same for useCallback and useMemo). I know two strategies to debug:

1. Break the useEffect logic into multiple useEffect. It is still fine, but expertise and time constraints will be there. People will not break the useEffect logic into smaller pieces first, they will try to spend time using logging the values and adding debugger so that not to change the production code.

2. Make use of usePrevious hook which can be defined something like this

```jsx
import React from 'react';

function usePrevious(value) {
  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;
```

And can be consumed like this:

```jsx
const previousA = usePrevious(a);

const previousB = usePrevious(b);

const previousC = usePrevious(c);

useEffect(() => {
  if (previousA !== a) {
    console.log(`a has changed from ${previousA} to ${a}`);
  }

  if (previousB !== b) {
    console.log(`a has changed from ${previousB} to ${b}`);
  }

  if (previousC !== c) {
    console.log(`a has changed from ${previousC} to ${c}`);
  }
}, [a, b, c]);
```

However we can do it , it quite too much of work every time you run in the issue , where useEffect callback is running unexpectedly.

To solve the above problem, I tried to create something which can enhance developer experience in this case. Let's see my try for the above problems.

## Usage

Note: This hook only logs in the development environment. It make use of standard process.env.NODE_ENV to decide. Open devtools console tab to see the logs.

1. When only dependency are passed as the single argument

```jsx
import { useWhatChanged } from '@simbathesailor/use-what-changed';

function App() {
  const [a, setA] = React.useState(0);

  const [b, setB] = React.useState(0);

  const [c, setC] = React.useState(0);

  const [d, setD] = React.useState(0);

  // Just place the useWhatChanged hook call with dependency before your

  // useEffect, useCallback or useMemo

  useWhatChanged([a, b, c, d]); // debugs the below useEffect

  React.useEffect(() => {
    // console.log("some thing changed , need to figure out")
  }, [a, b, c, d]);

  return <div className="container">Your app jsx</div>;
}
```

<p  align="center"><img  src="demoimages/indexonly.png"  width="500"  align="center"></p>

Above snapshot show the console log when b and c has changed in the above code example.

2. Pass two arguments to useWhatChanged which makes it possible for useWhatChanged to log the names of the variables also.

```jsx
useWhatChanged([a, b, c, d], 'a, b, c, d'); // debugs the below useEffect
```

<p  align="center"><img  src="demoimages/indexandname.png"  width="500"  align="center"></p>

## Color coding

A unique background color will be given to each title text. It helps us in recognising the specific effect when debugging. A unique id is also given to help the debugging further.

<p  align="center"><img  src="demoimages/multipleeffectandcolorcoding.png"  width="500"  align="center"></p>

## Demo link

[Demo link](https://6l8vp.csb.app/)
[Codesandbox link](https://codesandbox.io/s/fervent-shockley-6l8vp)

[Medium article link](https://medium.com/@anilchaudhary453/debug-your-reactjs-hooks-with-ease-159691843c3a)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

[simbathesailor](https://github.com/simbathesailor)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<table><tr><td  align="center"><a  href="https://github.com/simbathesailor"><img  src="https://avatars2.githubusercontent.com/u/5938110?s=400&u=f94d3ad624faa17c799d7bbd88cf2d2170b26813&v=4"  width="100px;"  alt="Anil kumar chaudhary"/><br /><sub><b>Anil kumar Chaudhary</b></sub></a><br /><a  href="https://github.com/simbathesailor/use-what-changed/commits?author=simbathesailor"  title="Code">💻</a>  <a  href="#ideas-simbathesailor"  title="Ideas, Planning, & Feedback">🤔</a>  <a  href="#design-simbathesailor"  title="Design">🎨</a>  <a  href="https://github.com/simbathesailor/use-what-changed/commits?author=simbathesailor"  title="Documentation">📖</a>  <a  href="https://github.com/simbathesailor/use-what-changed/issues/created_by/simbathesailor"  title="Bug reports">🐛</a></td></tr></table>
