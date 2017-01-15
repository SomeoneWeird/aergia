import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import open from 'open'

import config from '../../config';

import content from '../cssModules/content.scss';
import layout from '../cssModules/layout.scss';

function openGithub () {
  open('https://github.com/SomeoneWeird/aergia');
}

export default class sidebar extends Component {
  render() {
    return (
      <div className={layout.sidebar + ' col-xs-2'}>
        <div className={layout.sidebarLogo}>
          <span>Aergia</span>
        </div>
        <ul className={layout.sidebarLinks}>
          <li><Link to="/credits">Credits</Link></li>
          <li><Link to="#" onClick={openGithub}>Github</Link></li>
        </ul>
      </div>
    )
  }
}
