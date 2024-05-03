/* This is just a static page to display when no conversation is selected. */
import React from 'react';

import { Tinode } from 'tinode-sdk';

import { APP_NAME } from '../config.js';

export default class LogoView extends React.PureComponent {
  render() {
    const version = APP_NAME + ' (' + Tinode.getLibrary() + ')';
    let submitClasses = 'primary';
    if (this.props.disabled) {
      submitClasses += ' disabled';
    }
    return (
      <div   id="dummy-view">
        <div>
          <a href="https://www.pku.edu.cn/">
            <img id="logo" alt="logo" src="img/teamwork3.png" style={{ width: '300px' }} />
          </a>
          <h3>北京大学合作解决问题能力测评系统</h3>
        </div>
      </div>
    );
  }
};
