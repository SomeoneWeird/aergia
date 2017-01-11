import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import content from '../cssModules/content.scss';
import layout from '../cssModules/layout.scss';

export default class footer extends Component {
  render() {
    return (
      <footer>
        <div className={layout.footerLogo}>
          <span class="visuallyhidden">Aergia</span>
        </div>
        <div className={layout.footerLinks}>
          <Link to="/creditshere">Credits</Link>
          <Link to="https://github.com/SomeoneWeird/aergia">Github</Link>
        </div>
      </footer>
    )
  }
}
