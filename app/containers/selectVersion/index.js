import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

const values = [
  '11.2.0-39',
  '11.2.0-40'
]

export default class selectVersion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: values[0]
    }
    this.setVersion = this.setVersion.bind(this)
  }
  setVersion (event) {
    this.setState({
      selected: event.target.value
    })
    let t = event.target.value.split('-')
    config.version = t[0]
    config.versionPatch = t[1]
  }
  next () {
    this.props.router.push('/entry/determine')
  }
  getVersions () {
    return values.map(v => {
      return <option key={v} value={v}>{v}</option>
    })
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Select which version your DS is running. TODO: pull from hbl website</h2>
        <div className={section.content}>
          <select value={this.state.selected} onChange={this.setVersion}>
            {this.getVersions()}
          </select>
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
          <Link className={content.button} to={'/entry/determine'}>Next</Link>
        </div>
      </section>
    )
  }
}
