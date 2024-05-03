// Tinode config panel.
import React from 'react';
import { FormattedMessage } from 'react-intl';
import HashNavigation from '../lib/navigation.js';
//import TestView from './test-view.jsx';

export default class AdminSettingsView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
      parts: [
        { id: 1, value: '1', label: 'part1' },
        { id: 2, value: '2', label: 'part2' },
        { id: 3, value: '3', label: 'part3' },     
        { id: 4, value: '12', label: 'part1,part2' },
        { id: 5, value: '23', label: 'part2,part3' },
        { id: 6, value: '13', label: 'part1,part3' },
        { id: 7, value: '123', label: 'part1,part2,part3' }
      ]
    };
  
    this.handleAdminSubmit = this.handleAdminSubmit.bind(this);
    this.handlePartsSelect = this.handlePartsSelect.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount() {
    //this.props.handSend("111");

  }


  handleAdminSubmit(e) {
    e.preventDefault();
    console.log("1123333333333333333333");
    const data = new FormData(e.target);
    const parts = this.state.selectedOption.split(',');
  
      const formData = {};
    for (let key of data.keys()) {
      formData[key] = data.get(key);
    }
    
    


    // Add parts to formData
    formData.parts = parts;

    // Send a POST request http://localhost:6060
    fetch('/api/createtest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      mode:'cors'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Handle success
        console.log('Data added successfully');
      } else {
        // Handle error
        console.error('An error occurred while adding data');
      }
    })
    .catch(error => {
      // Handle network error
      console.error('A network error occurred while adding data');
    });
        
  }

  handlePartsSelect(e){
    e.preventDefault();
  
    this.setState({selectedOption: e.target.value });
  }

  handleClick(e){
    e.preventDefault();
    HashNavigation.navigateTo("#register");    
  }



  render() {   
    return (
      <form id="admin-settings-form" className="panel-form" onSubmit={this.handleAdminSubmit}>
      
        <div className="panel-form-row">        
          <label className="small">
            <FormattedMessage id="label_test_name" defaultMessage="label_test_name"
              description="label_test_name" />
          </label>
          <input  type="text" style={{ width: '200px' }} id="testName" name="testName"></input>
        </div>
        <div className="panel-form-row">
          <label className="small">
            <FormattedMessage id="label_parts_container" defaultMessage="label_parts_container"
              description="label_parts_container" />
          </label>
          <select  style={{ width: '200px' }} value={this.state.selectedOption} onChange={this.handlePartsSelect}>
            <option value=""></option>
            {this.state.parts.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="panel-form-row">        
          <label className="small">
            <FormattedMessage id="label_test_time" defaultMessage="label_test_time"
              description="label_test_time" />
          </label>
        </div>
        <div className="panel-form-row">
          <label className="small">
            <FormattedMessage id="part1_read_time" defaultMessage="part1_read_time"
              description="part1_read_time" />
          </label>
          <input  type="text" style={{ width: '200px' }} id="part1_read_time" name="part1_read_time"></input>  
        </div>
        <div className="panel-form-row"> 
          <label className="small">
            <FormattedMessage id="part1_do_time" defaultMessage="part1_do_time"
              description="part1_do_time" />
          </label>
          <input  type="text" style={{ width: '200px' }} id="part1_do_time" name="part1_do_time"></input>                 
        </div>        
        <div className="panel-form-row">
          <label className="small">
            <FormattedMessage id="part2_read_time" defaultMessage="part2_read_time"
              description="part2_read_time" />
          </label>
          <input  type="text" style={{ width: '200px' }} id="part2_read_time" name="part2_read_time"></input>  
        </div>
        <div className="panel-form-row"> 
          <label className="small">
            <FormattedMessage id="part2_do_time" defaultMessage="part2_do_time"
              description="part2_do_time" />
          </label>
          <input  type="text" style={{ width: '200px' }} id="part2_do_time" name="part2_do_time"></input>                 
        </div>

        <div className="panel-form-row">
          <label className="small">
            <FormattedMessage id="part3_read_time" defaultMessage="part3_read_time"
              description="part3_read_time" />
          </label>
          <input  type="text" style={{ width: '200px' }} id="part3_read_time" name="part3_read_time"></input>  
        </div>
        <div className="panel-form-row"> 
          <label className="small">
            <FormattedMessage id="part3_do_time" defaultMessage="part3_do_time"
              description="part3_do_time" />
          </label>
          <input  type="text"  style={{ width: '200px' }} id="part3_do_time" name="part3_do_time"></input>                 
        </div>

        <div className="dialog-buttons">
          <button type="submit" className="primary" >
            <FormattedMessage id="button_create_test" defaultMessage="button_create_test"
              description="Button [button_create_test]" />
          </button>
        </div>

      </form>
    );
  }
};
