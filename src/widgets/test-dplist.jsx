import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

const TestDropdownList = () => {
    let submitClasses = 'primary';

    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([]);


    useEffect(() => {
        // 在组件挂载时获取下拉框的选项数据
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const response = await fetch('http://localhost:6060/api/gettestlist'); // 替换为你的接口URL
            const data = await response.json();
            console.log(data);
            const processdata = data.data.map((item) => ({
                id: item.Id,
                name:item.Name,
                label: item.Name
            }))
            setOptions(processdata);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
    };
   

    return (
        <div>
            <select  style={{ width: '200px' }} value={selectedOption} onChange={handleSelect}>
                <option value=""></option>
                {options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TestDropdownList;
