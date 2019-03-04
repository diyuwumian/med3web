/**
 * @fileOverview UiTF
 * @author Epam
 * @version 1.0.0
 */


// ********************************************************
// Imports
// ********************************************************

// special css for NoUiSlioder
import 'nouislider/distribute/nouislider.css';
import React from 'react';
import { connect } from 'react-redux';

import Nouislider from 'react-nouislider';
import StoreActionType from '../store/ActionTypes';


// ********************************************************
// Const
// ********************************************************

// ********************************************************
// Class
// ********************************************************
/**
 * Class UiTF some text later...
 */
class UiTF extends React.Component {
  //
  //shouldComponentUpdate() {
  //  return false;
  //}
  //
  constructor(props) {
    super(props);
    this.m_updateEnable = true;
  }
  onChangeSliderTF() {
    this.m_updateEnable = false;
    let valr = 0.0;
    let valg = 0.0;
    let valb = 0.0;
    const aval = this.refs.sliderTF.slider.get();
    valr = Number.parseFloat(aval[0]);
    valg = Number.parseFloat(aval[1]);
    valb = Number.parseFloat(aval[2]);
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_SLIDER_3DR, slider3d_r: valr });
    store.dispatch({ type: StoreActionType.SET_SLIDER_3DG, slider3d_g: valg });
    store.dispatch({ type: StoreActionType.SET_SLIDER_3DB, slider3d_b: valb });
  }
  shouldComponentUpdate() {
    return this.m_updateEnable;
  }
  onChangeSliderOpacity() {
  }
  onChangeSliderIsosurface() {
  }
  /**
   * Main component render func callback
   */
  render() {
    const store = this.props;

    // const modeViewIndex = store.modeView;
    const mode3d = store.mode3d;
    const slider3dr = store.slider3d_r;
    const slider3dg = store.slider3d_g;
    const slider3db = store.slider3d_b;
    const strSliderTF = 'sliderTF';
    const strSliderIsosurface = 'sliderIsosurface';
    const strSliderOpacity = 'sliderOpacity';
    const valToolTps = true;
    const wArr = [slider3dr, slider3dg, slider3db];
    const wArrOpacity = [slider3dr];
    const wArrIsosurface = [slider3dr];

    const styleObj = {
      borderColor: 'red white', 
      borderStyle: 'solid' 
    };
    const jsxVolumeTF =
      <ul className="list-group" style={styleObj}>
        <li className="list-group-item">
          <Nouislider onSlide={this.onChangeSliderTF.bind(this)} ref={strSliderTF}
            range={{ min: 0.0, max: 1.0 }}
            start={wArr} connect={[false, true, false, true]} step={0.02} tooltips={valToolTps} />
        </li>
        <li className="list-group-item">
          <p> Opacity </p>
          <Nouislider onSlide={this.onChangeSliderOpacity.bind(this)} ref={strSliderOpacity}
            range={{ min: 0.0, max: 1.0 }}
            start={wArrOpacity} step={0.02} tooltips={valToolTps} />
        </li>
      </ul>

    const jsxIsoTF =
      <ul className="list-group">
        <li className="list-group-item">
          <p> Isosurface </p>
          <Nouislider onSlide={this.onChangeSliderIsosurface.bind(this)} ref={strSliderIsosurface}
            range={{ min: 0.0, max: 1.0 }}
            start={wArrIsosurface} step={0.02} tooltips={valToolTps} />
        </li>
      </ul>

    const jsxArray = [jsxIsoTF, jsxVolumeTF, jsxIsoTF];
    const jsxRet = jsxArray[mode3d];
    return jsxRet;
  }
}

export default connect(store => store)(UiTF);