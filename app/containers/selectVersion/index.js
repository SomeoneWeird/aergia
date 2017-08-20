import React, { Component } from 'react'

import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'


import otherapp from 'otherapp'

import config from '../../config'

import section from '../cssModules/section.scss'
import content from '../cssModules/content.scss'

import styles from './index.css'

export default class selectVersion extends Component {
  constructor (props) {
    super(props)
    this.possibleValues = []
    this.state = {
      loading: true,
      selected: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.next = this.next.bind(this)
  }
  componentWillMount () {
    otherapp.versions((err, versions) => {
      if (err) {
        return console.error(err)
      }
      this.setState({
        ...this.state,
        loading: false
      })
      this.possibleValues = versions
      this.setVersion(this.possibleValues[0])
    })
  }
  handleChange (event, index, value) {
    this.setVersion(value)
  }
  setVersion (version) {
    this.setState({
      ...this.state,
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
      return <MenuItem key={v} value={v} primaryText={v} />
    })
  }
  getContent () {
    if (this.state.loading) {
      return <div className={styles.center}>
        <CircularProgress size={80} thickness={5} />
        <br />
        <br />
        <br />
        Loading versions...
      </div>
    } else {
      return <div className={`${styles.center} ${styles.select}`}>
        <SelectField
          floatingLabelText="Version"
          value={this.state.selected}
          onChange={this.handleChange}
          maxHeight={200}
        >
          {this.getVersions()}
        </SelectField>
      </div>
    }
  }
  render () {
    return (
      <section>
        <h2 className={section.title}>{ config.model === '2ds' ? '2DS' : '3DS' } Version</h2>
        <div className={section.content}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <RaisedButton label='Back' onClick={browserHistory.goBack} />
          <RaisedButton className={content.buttonNext} label='Next' onClick={this.next} />
        </div>
      </section>
    )
  }
}
