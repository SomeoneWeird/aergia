import React, { Component } from 'react';

import { Link } from 'react-router';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

export default class HomePage extends Component {
  render() {
    return (
      <section>
        <h2 className={section.title}>3DS Hacks</h2>
        <div className={section.content}>
          <p>An interactive guide to A9LH + Luma on your 3DS</p>
        </div>
        <div className={section.navigation}>
          <Link className={content.button} to="/config/model">Start</Link>
        </div>
      </section>
    );
  }
}
