import React  from 'react';

class TestView extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          
        };
      
        this.handleClick=this.handleClick.bind(this);

    }
    
    handleClick=()=>{
        this.props.handleTopicSelected("grp0J5IIvmaIs0");
        this.props.sendMessage("123456789");
        
    }

    render() {
        return (
            <div className="dialog-buttons">
            <button type="submit" className="primary" onClick={this.handleClick}>
                test button
            </button>
            </div>
        );
    }
}

export default TestView;
