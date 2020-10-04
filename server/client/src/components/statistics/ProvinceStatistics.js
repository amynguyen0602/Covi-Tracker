import React, { Component } from 'react';
import { Select } from 'antd';
import axios from 'axios'


export class ProvinceStatistics extends Component {
    constructor() {
        super()
        this.state = {
            province: []
        }
    }
    async componentDidMount() {
        const res = await axios.get('https://api.covid19tracker.ca/provinces')
        const province = res.data
        this.setState({province})
    }

    getProvinceSelection = () => {
        return this.state.province.map(data => {
            return <Select.Option value={data.code}>{data.name}</Select.Option>
        })
    }
	render() {
		return (
			<div
				style={{
					margin: '20px 10px 20px 10px',
					padding: '20px',
					boxShadow: '1px 1px 10px 2px #F0F0F0',
				}}
			>
				<Select
					showSearch
					style={{ width: 200 }}
					placeholder="Select province"
					optionFilterProp="children"
					//onChange={onChange}
					//onFocus={onFocus}
					//onBlur={onBlur}
					//onSearch={onSearch}
					filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				>
					{this.getProvinceSelection()}
				</Select>
			</div>
		);
	}
}

export default ProvinceStatistics;
