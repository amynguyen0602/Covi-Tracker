import React from 'react';
import { Row, Col, Divider } from 'antd';
import { Timeline } from 'antd';
import TimelineItem from '../reportcase/TimelineItem';
import CanadaStatistics from '../statistics/CanadaStatistics';
import ProvinceStatistics from '../statistics/ProvinceStatistics';
import { connect, useSelector } from 'react-redux'
import { fetchReportCases } from '../../redux/actions/visitsActions'
import { useEffect, useState } from 'react';

const events = [
	{
		id: 1,
		date: '01-Sep-2020',
		province: 'BC',
		provinceName: 'British Columbia',
		places: [
			{ id: 1, date: '25-Aug-2020', time: '', address: 'ABC Restaurant', city: 'Burnaby' },
			{ id: 2, date: '25-Aug-2020', time: '12:00 PM', address: 'ABC Restaurant', city: 'Vancouver' },
			{ id: 3, date: '25-Aug-2020', time: '12:00 PM', address: 'ABC Restaurant', city: 'Burnaby' },
			{ id: 4, date: '25-Aug-2020', time: '12:00 PM', address: 'ABC Restaurant', city: 'Surrey' },
			{ id: 5, date: '25-Aug-2020', time: '12:00 PM', address: 'ABC Restaurant', city: 'Surrey' },
			{ id: 6, date: '25-Aug-2020', time: '12:00 PM', address: 'ABC Restaurant', city: 'Surrey' },
		],
	},
	{
		id: 2,
		date: '27-Aug-2020',
		province: 'ON',
		provinceName: 'Ontario',
		places: [
			{ id: 1, date: '25-Aug-2020', time: '12:00 PM', address: 'ABC Restaurant', city: 'Surrey' },
			{ id: 2, date: '25-Aug-2020', time: '12:00 PM', address: 'ABC Restaurant', city: 'Surrey' },
			{ id: 3, date: '25-Aug-2020', time: '12:00 PM', address: 'ABC Restaurant', city: 'Surrey' },
		],
	},
	{
		id: 3,
		date: '25-Aug-2020',
		province: 'AB',
		provinceName: 'Alberta',
		places: [
			{ id: 1, date: '25-Aug-2020', time: '', address: 'ABC Restaurant, Burnaby', city: 'Surrey' },
			{ id: 2, date: '25-Aug-2020', time: '12:00 PM', address: 'ABC Restaurant', city: 'Surrey' },
			{ id: 3, date: '25-Aug-2020', time: '', address: 'ABC Restaurant, Burnaby', city: 'Surrey' },
		],
	},
];

function Dashboard({ fetchReportCases, reportCases }) {

	const [events, setEvents] = useState([])

	const timelineEvent = () => {
		return events.map((event) => {
			return (
				<Timeline.Item key={event._id}>
					<TimelineItem event={event} />
				</Timeline.Item>
			);
		});
	};
	useEffect(() => {
		fetchReportCases()
	})

	useEffect(() => {
		if(reportCases) {
			setEvents(reportCases)
		}
	})
	return (
		<>
			<Row>
				<Col xs={24} sm={24} md={18} lg={18} xl={18}>
					<div style={{margin: '20px 10px 20px 10px',
							padding: '50px',
							boxShadow: '1px 1px 10px 2px #F0F0F0', minHeight: '774px'}}>
						<Timeline mode="left">{timelineEvent()}</Timeline>
					</div>
				</Col>
				<Col xs={24} sm={24} md={6} lg={6} xl={6}>
					<CanadaStatistics />
					<Divider />
					<ProvinceStatistics />
				</Col>
			</Row>
		</>
	)
}

const mapStateToProps = ({selfReport: {reportCases}}) => {
	return {
		reportCases
	}
}

export default connect(mapStateToProps, { fetchReportCases }) (Dashboard);
