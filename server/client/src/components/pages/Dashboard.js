import React from 'react';
import { Row, Col, Divider } from 'antd';
import { Timeline } from 'antd';
import TimelineItem from '../reportcase/TimelineItem';
import CanadaStatistics from '../statistics/CanadaStatistics';
import ProvinceStatistics from '../statistics/ProvinceStatistics';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';


function Dashboard() {

	const [events, setEvents] = useState([])
	const reportCases = useSelector((state) => state.selfReport.reportCases)

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
		if(reportCases) {
			//sort the most recent first
			reportCases.sort((case1, case2) => 
				new Date(case2.confirmedDate) - new Date(case1.confirmedDate))
			setEvents(reportCases)
		}
	}, [reportCases])
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

export default Dashboard;
