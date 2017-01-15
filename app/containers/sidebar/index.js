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
      <div className={layout.sidebar}>
        <div className={layout.sidebarLogo}>
          <span>Aergia</span>
        </div>
        <div className={layout.sidebarLinks}>
          <Link to="/credits">Credits</Link>
          <br />
          <br />
          <Link to="#" onClick={openGithub}>Github</Link>
        </div>
      </div>
    )
  }
}
