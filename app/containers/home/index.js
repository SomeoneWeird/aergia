import React, { Component } from 'react';

import { Link } from 'react-router';

import styles from './home.scss';

export default class HomePage extends Component {
  render() {
    return (
       <div>
        <center>
          <div className={styles.container}>
            <h2>3DS Hacks</h2>
            <h3>An interactive guide to A9LH + Luma on your 3DS</h3>
            <Link to='/config/model'>Start</Link>
          </div>
        </center>
      </div>
    );
  }
}
