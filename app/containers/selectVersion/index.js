import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';
import otherapp from 'otherapp'

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

export default class selectVersion extends Component {
  constructor (props) {
    super(props)
    this.possibleValues = []
    this.state = {
      selected: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount () {
    otherapp.versions((err, versions) => {
      if (err) {
        return console.error(err)
      }
      this.possibleValues = versions
      this.setVersion(this.possibleValues[0])
    })
  }
  handleChange (event) {
    this.setVersion(event.target.value)
  }
  setVersion (version) {
    this.setState({
      selected: version
    })
    let t = version.split('-')
    config.version = t[0]
    config.versionPatch = t[1]
  }
  next () {
    this.props.router.push('/entry/determine')
  }
  getVersions () {
    return this.possibleValues.map(v => {
      return <option key={v} value={v}>{v}</option>
    })
  }
  getContent () {
    if (this.possibleValues.length)
      return <select value={this.state.selected} onChange={this.handleChange}>
        {this.getVersions()}
      </select>
    else {
      return <div>Loading values...</div>
    }
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Select which version your DS is running</h2>
        <div className={section.content}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
          <Link className={content.button} to={'/entry/determine'}>Next</Link>
        </div>
      </section>
    )
  }
}
