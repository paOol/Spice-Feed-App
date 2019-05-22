import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-138535925-1');
if (typeof window !== 'undefined') {
  ReactGA.pageview(window.location.pathname + window.location.search);
}
export default function Layout(props) {
  return (
    <div className='wrap'>
      <Nav />
      {props.children}
    </div>
  );
}
