// Login form.
import React from 'react';
import TestDropdownList from './TestDplist';

     /* <div className="panel-form-row">
          <CheckBox id="save-token" name="save-token" checked={this.state.saveToken}
            onChange={this.handleToggleSaveToken} />
          <label htmlFor="save-token">&nbsp;
            <div id="stay_logged_in" defaultMessage="Stay logged in"
              description="Label for a checkbox" />
          </label>
          <a href="#reset">
            <div id="forgot_password_link" defaultMessage="Forgot password?"
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
            clientid: '1',
            testid: '2'
        });
        const url = `http://localhost:6060/api/getgroupinfo?${params}`;
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

        <div id="group_prompt" defaultMessage="Group"
          description="Placeholer for group">
        {
          (group_prompt) => <input type="text"  style={{ width: '200px' }} id="groupLogin" readOnly 
            placeholder={group_prompt}
            autoComplete="username"
            autoCorrect="off"
            autoCapitalize="none"
            value={this.state.groupOption}
            onChange={this.handleLoginChange}
            required autoFocus />
        }
        </div>

        <div id="login_prompt" defaultMessage="Login"
          description="Placeholer for username/login">
        {
          (login_prompt) => <input type="text"  style={{ width: '200px' }} id="inputLogin" 
            placeholder={login_prompt}
            autoComplete="username"
            autoCorrect="off"
            autoCapitalize="none"
            value={this.state.login}
            onChange={this.handleLoginChange}
            required autoFocus />
        }
        </div>
        <div id="password_prompt" defaultMessage="Password"
          description="Placeholder/prompt for entering password">
        {
          (password_prompt) => <input type="password"  style={{ width: '200px' }} id="inputPassword"
            placeholder={password_prompt}
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            required={true} />
        }
        </div>

        <div className="dialog-buttons">
          <button className={submitClasses} type="submit" onClick={this.handleClick} >
            <div id="button_group_in" defaultMessage="Get Group info"
              description="Button [Get Group]" />
          </button>
          <button className={submitClasses} type="submit">
            <div id="button_admin_in" defaultMessage="Admin Sign in"
              description="Button [Admin Sign In]" />
          </button>
        </div>
      </form>
    );
  }
};
