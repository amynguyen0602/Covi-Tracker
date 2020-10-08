import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { Card } from 'antd';
import StatisticCard from './StatisticCard'

export class CanadaStatistics extends Component {
	state = {
		statistic: []
	}
	async componentDidMount() {
		await this.props.fetchCanStatistic()
		const statistic  = this.props.statistic.data[0]
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
		this.setState({statistic: statisticArray})
	}

	renderStatistic = () => {
		return this.state.statistic.map(stat => {
			return <StatisticCard key = {stat.title} data = {stat} />
		})
	}
	render() {
		return (
			<Card
				style={{ margin: '20px 10px 20px 10px', boxShadow: '1px 1px 10px 2px #F0F0F0' }}
				title={
					<div>
						<img alt="" src="/canada-flag.png" style={{ width: '20px' }} />
						<span style={{
								padding: '10px',
								position: 'relative',
								top: '2px',
								fontWeight: 'bold',
							}}> Canada </span>
					</div>
				}> 
				{this.renderStatistic()}
			</Card>
		);
	}
}

function mapStateToProps({ statistic } ) {
    return {
		statistic
    }
}

export default connect(mapStateToProps, actions) (CanadaStatistics);
