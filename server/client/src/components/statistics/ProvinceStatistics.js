import React, { Component } from 'react';
import { Select, Card } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import axios from 'axios'
import StatisticCard from './StatisticCard'


export class ProvinceStatistics extends Component {
    constructor() {
        super()
        this.state = {
			province: [],
			statistic: []
        }
    }
    async componentDidMount() {
		const res = await axios.get('https://api.covid19tracker.ca/provinces')
		await this.props.fetchProvinceStatistic('BC')
		const province = res.data
		const statisticArray = this.setStatistic()
		this.setState({ province, statistic: statisticArray })
	}

	setStatistic = () => {
		const statistic = this.props.statistic.data.reverse()[0]
		const statisticArray = [
			{
				title: 'Confirmed',
				total: statistic.total_cases,
				change: statistic.change_cases
			},
			{
				title: 'Active',
				total: statistic.total_cases - statistic.total_recoveries - statistic.total_fatalities,
				change: statistic.change_cases - statistic.change_recoveries - statistic.change_fatalities
			},
			{
				title: 'Recovered',
				total: statistic.total_recoveries,
				change: statistic.change_recoveries
			},
			{
				title: 'Deaths',
				total: statistic.total_fatalities,
				change: statistic.change_fatalities
			}
		]
		return statisticArray
	}
	
	renderStatistic = () => {
		return this.state.statistic.map(stat => {
			return <StatisticCard key = {stat.title} data = {stat} />
		})
	}

    getProvinceSelection = () => {
        return this.state.province.map(data => {
            return <Select.Option key = {data.code} value={data.code}>{data.name}</Select.Option>
        })
	}
	onChange = async (val) => {
		await this.props.fetchProvinceStatistic(val)
		const statisticArray = this.setStatistic()
		this.setState(prev => ({
			...prev,
			statistic: statisticArray
		}))
	}
	render() {
		return (<Card
			style={{ margin: '20px 10px 20px 10px', boxShadow: '1px 1px 10px 2px #F0F0F0' }}
			title={
				<Select
					showSearch
					style={{ width: 200 }}
					placeholder="Select province"
					optionFilterProp="children"
					defaultValue="BC"
					onChange={this.onChange}
					filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				>
					{this.getProvinceSelection()}
				</Select>
			}> 
				
				{this.renderStatistic()}</Card>
		);
	}
}

function mapStateToProps( { statistic }) {
    return {
		statistic
    }
}

export default connect(mapStateToProps, actions) (ProvinceStatistics);
