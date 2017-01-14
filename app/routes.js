import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import AppNotFound from './containers/AppNotFound'

import HomePage from './containers/home';

import SelectSD from './containers/selectSD'

import SelectModel from './containers/selectModel'
import SelectRegion from './containers/selectRegion'
import SelectVersion from './containers/selectVersion'

import DetermineEntry from './containers/entrypoints/determine'
import SoundHaxStart from './containers/entrypoints/soundhax/index'

import Decrypt9 from './containers/decrypt9'

import ParentalControls from './containers/parentalControls'
import CheckWifi from './containers/checkWifi'
import TwoDSBrickWarning from './containers/2dsbrickwarning'
import New3DSBrickWarning from './containers/n3dsbrickwarning'

import CTRTransfer from './containers/ctrtransfer'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />

    <Route path="/config/model" component={SelectModel} />
    <Route path="/config/region" component={SelectRegion} />
    <Route path="/config/version" component={SelectVersion} />

    <Route path="/selectsd" component={SelectSD} />

    <Route path="/entry/determine" component={DetermineEntry} />
    <Route path="/entry/soundhax/start" component={SoundHaxStart} />

    <Route path="/decrypt9" component={Decrypt9} />

    <Route path="/checkParentalControls" component={ParentalControls} />
    <Route path="/checkWifi" component={CheckWifi} />
    <Route path="/2dsbrickwarning" component={TwoDSBrickWarning} />
    <Route path="/n3dsbrickwarning" component={New3DSBrickWarning} />

    <Route path="/ctrtransfer" component={CTRTransfer} />

    <Route path="*" component={AppNotFound}/>
  </Route>
);
