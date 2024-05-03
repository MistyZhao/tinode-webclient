// Login form.
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CheckBox from '../widgets/checkbox.jsx';
import VisiblePassword from '../widgets/visible-password.jsx';
import TestDropdownList from '../widgets/test-dplist.jsx';




     /* <div className="panel-form-row">
          <CheckBox id="save-token" name="save-token" checked={this.state.saveToken}
            onChange={this.handleToggleSaveToken} />
          <label htmlFor="save-token">&nbsp;
            <FormattedMessage id="stay_logged_in" defaultMessage="Stay logged in"
              description="Label for a checkbox" />
          </label>
          <a href="#reset">
            <FormattedMessage id="forgot_password_link" defaultMessage="Forgot password?"
              description="Link to Reset password form" />
          </a>
          <a href="#reset">
            <FormattedMessage id="forgot_password_link" defaultMessage="Forgot password?"
              description="Link to Reset password form" />
          </a>
        </div>*/
export default class LoginView extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      login: props.login,
      password: '',
      hostName: props.serverAddress,
      saveToken: props.persist,
      groupOption: ''
    };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleToggleSaveToken = this.handleToggleSaveToken.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdminSetting = this.handleAdminSetting.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }

  handleLoginChange(e) {
    this.setState({login: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleToggleSaveToken() {
    this.props.onPersistenceChange(!this.state.saveToken);
    this.setState({saveToken: !this.state.saveToken});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onLogin(this.state.login.trim(), this.state.password.trim());
  }
  handleAdminSetting(e){
    e.preventDefault();
    //this.props.handleShowInfoView();
  }


  handleClick = async (e) => {
    
    try {
        e.preventDefault();
        const params = new URLSearchParams({
            clientid: 'demo1',
            testid: '2'
        });
        // http://localhost:6060
        const url = `/api/getgroupinfo?${params}`;
        const response = await fetch(url);
        const data = await response.json();

        const processdata = data.data.map((item) => ({
            groupid: item.Groupid,
            userid:item.Userid,
            username: item.Username
        }))
        this.setState({
          groupOption:processdata[0].groupid,
          login:'alice',
          password:'alice123'
        });
        // window.location.pathname = "/home"
        // 处理响应数据
    } catch (error) {
        console.error('Error fetching options:', error);
        
    }
};


  render() {
    let submitClasses = 'primary';
    if (this.props.disabled) {
      submitClasses += ' disabled';
    }

    return (
      <form id="login-form" onSubmit={this.handleSubmit}>

        <div>
          <TestDropdownList id="test-dplist" />       
        </div>

        <FormattedMessage id="group_prompt" defaultMessage="Group"
          description="Placeholer for group">
        {
          (group_prompt) => <input type="text"  style={{ width: '220px' }} id="groupLogin" readOnly 
            placeholder={group_prompt}
            autoComplete="username"
            autoCorrect="off"
            autoCapitalize="none"
            value={this.state.groupOption}
            onChange={this.handleLoginChange}
            required autoFocus />
        }
        </FormattedMessage>

        <FormattedMessage id="login_prompt" defaultMessage="Login"
          description="Placeholer for username/login">
        {
          (login_prompt) => <input type="text"  style={{ width: '220px' }} id="inputLogin" 
            placeholder={login_prompt}
            autoComplete="username"
            autoCorrect="off"
            autoCapitalize="none"
            value={this.state.login}
            onChange={this.handleLoginChange}
            required autoFocus />
        }
        </FormattedMessage>
        <FormattedMessage id="password_prompt" defaultMessage="Password"
          description="Placeholder/prompt for entering password">
        {
          (password_prompt) => <input type="password"  style={{ width: '220px' }} id="inputPassword"
            placeholder={password_prompt}
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            required={true} />
        }
        </FormattedMessage> 

        <div className="dialog-buttons">
          <button className={submitClasses} type="submit" onClick={this.handleClick} >
            <FormattedMessage id="button_group_in" defaultMessage="Get Group info"
              description="Button [Get Group]" />
          </button>
          <button className={submitClasses} type="default" onClick={window.location.pathname = "/home"}>
            <FormattedMessage id="button_admin_in" defaultMessage="Admin Sign in"
              description="Button [Admin Sign In]" />
          </button>
        </div>
      </form>
    );
  }
};
