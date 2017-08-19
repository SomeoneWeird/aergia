import React, { Component } from 'react'

import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import config from '../../config'

import s from './index.css'

import section from '../cssModules/section.scss'

const flags = {
  usa: require('./images/usa.jpg'),
  eur: require('./images/eur.jpg'),
  jpn: require('./images/jpn.jpg'),
  kor: require('./images/kor.png')
}

class Flag extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    let { region } = this.props

    return (
      <div className={'col-xs-3'}>
        <img
          className={s.flag}
          src={flags[region]}
          onClick={() => {
            config.region = region
            this.props.router.push('/config/version')
          }}
        />
      </div>
    )
  }
}

export default class selectRegion extends Component {
  render () {
    return (
      <section>
        <h2 className={section.title}>Select which region your DS is</h2>
        <br />
        <br />
        <br />
        <br />
        <div className='row'>
          <Flag router={this.props.router} region='usa' />
          <Flag router={this.props.router} region='eur' />
          <Flag router={this.props.router} region='jpn' />
          <Flag router={this.props.router} region='kor' />
        </div>
        <div className={section.navigation}>
          <RaisedButton label='Back' onClick={browserHistory.goBack} />
        </div>
      </section>
    )
  }
}
