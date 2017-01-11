import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import open from 'open'

import config from '../../config';

import content from '../cssModules/content.scss';
import layout from '../cssModules/layout.scss';

function openGithub () {
  open('https://github.com/SomeoneWeird/aergia')
}

export default class footer extends Component {
  render() {
    return (
      <footer>
        <div className={layout.footerLogo}>
          <span className={"visuallyhidden"}>Aergia</span>
        </div>
        <div className={layout.footerLinks}>
          <Link to="/credits">Credits</Link>
          <Link to="#" onClick={openGithub}>Github</Link>
        </div>
      </footer>
    )
  }
}
