import React, { Component } from 'react'

import { Link } from 'react-router'

import open from 'open'

import layout from '../cssModules/layout.scss'

function openGithub () {
  open('https://github.com/SomeoneWeird/aergia')
}

export default class sidebar extends Component {
  getName () {
    if (this.props.location.pathname === '/') {
      return
    }
    return <span>
      <li>
        A
      </li>
      <br />
      <li>
        E
      </li>
      <br />
      <li>
        R
      </li>
      <br />
      <li>
        G
      </li>
      <br />
      <li>
        I
      </li>
      <br />
      <li>
        A
      </li>
    </span>
  }
  render () {
    return (
      <div className={layout.sidebar + ' col-xs-1'}>
        <ul className={layout.sidebarLinks}>
          {this.getName()}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <li><Link to='/credits'>Credits</Link></li>
          <br />
          <li><Link to='#' onClick={openGithub}>Github</Link></li>
        </ul>
      </div>
    )
  }
}
