import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import AppNotFound from './containers/AppNotFound'

import HomePage from './containers/home'

import SelectSD from './containers/selectSD'

import SelectModel from './containers/selectModel'
import SelectRegion from './containers/selectRegion'
import SelectVersion from './containers/selectVersion'

import DetermineEntry from './containers/entrypoints/determine'

import GetStarted from './containers/getstarted'

import SoundHaxSetup from './containers/entrypoints/soundhax/setup'
import SoundHaxLaunch from './containers/entrypoints/soundhax/launch'

import Decrypt9Setup from './containers/decrypt9/setup'
import Decrypt9Launch from './containers/decrypt9/launch'

import ParentalControls from './containers/parentalControls'
import CheckWifi from './containers/checkWifi'
import TwoDSBrickWarning from './containers/2dsbrickwarning'
import New3DSBrickWarning from './containers/n3dsbrickwarning'

import CTRTransferSetup from './containers/ctrtransfer/setup'
import CTRTransferLaunch from './containers/ctrtransfer/launch'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />

    <Route path='/config/model' component={SelectModel} />
    <Route path='/config/region' component={SelectRegion} />
    <Route path='/config/version' component={SelectVersion} />

    <Route path='/selectsd' component={SelectSD} />

    <Route path='/entry/determine' component={DetermineEntry} />

    <Route path='/getstarted' component={GetStarted} />

    <Route path='/entry/soundhax/setup' component={SoundHaxSetup} />

    <Route path='/decrypt9/setup' component={Decrypt9Setup} />

    <Route path='/checkParentalControls' component={ParentalControls} />
    <Route path='/checkWifi' component={CheckWifi} />
    <Route path='/2dsbrickwarning' component={TwoDSBrickWarning} />
    <Route path='/n3dsbrickwarning' component={New3DSBrickWarning} />

    <Route path='/ctrtransfer/setup' component={CTRTransferSetup} />

    <Route path='/entry/soundhax/launch' component={SoundHaxLaunch} />

    <Route path='/decrypt9/launch' component={Decrypt9Launch} />

    <Route path='/ctrtransfer/launch' component={CTRTransferLaunch} />

    <Route path='*' component={AppNotFound} />
  </Route>
)
