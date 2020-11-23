import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Image } from 'antd';
import styles from '../../styles/styles';
import { AimOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux'
import { fetchReportCases } from '../../redux/actions/visitsActions'

function Navbar({ location, fetchReportCases }) {
	const [currentLocation, setCurrentLocation] = useState({})
	const [nearbyCasesCount, setNearbyCasesCount] = useState(0)

	const reportCases = useSelector((state) => state.selfReport.reportCases)
	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(async ({coords: {longitude, latitude}}) => {
				setCurrentLocation({latitude, longitude})
				fetchReportCases()
		   }) 
		  }
	}, [])

	
	useEffect(() => {
		fetchReportCases()
	}, [])

	useEffect(() => {
		const { latitude, longitude } = currentLocation
		if(currentLocation) {
			if(reportCases) {
				const nearbyReportCases = reportCases.filter(reportCase => {
					return reportCase.visits.filter(visit => {
						return getDistanceFromLatLon(latitude, longitude, visit.lat, visit.lng) < 500
					}).length > 0
				})
				let placesCount = 0
				nearbyReportCases.forEach(reportCase => {
					placesCount += reportCase.visits.length
				})
				setNearbyCasesCount(placesCount)
			}
		}
	}, [reportCases])

	const getDistanceFromLatLon = (lat1, lon1, lat2, lon2) => {
		var R = 6371e3; 
		var dLat = degToRad(lat2-lat1)
		var dLon = degToRad(lon2-lon1)
		var a = 
		  Math.sin(dLat/2) * Math.sin(dLat/2) +
		  Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
		  Math.sin(dLon/2) * Math.sin(dLon/2)
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c
		return d
	  }
	  
	  const degToRad = (deg) => {
		return deg * (Math.PI/180)
	  }

	return (
		<>
			<Menu theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['/']}
				selectedKeys={[location.pathname]}
				style={{ lineHeight: '74px' }}
				className="menu"
				breakpoint="lg"
				collapsedWidth="0">
				<Menu.Item key="/selfReport" style={styles.navRight}>
					Self Report
					<Link to="/selfReport" />
				</Menu.Item>
				<Menu.Item key="/map" style={styles.navRight}>
					Map
					<Link to="/map" />
				</Menu.Item>
				<Menu.Item key="/" style={styles.navRight}>
					Home
					<Link to="/" />
				</Menu.Item>
			</Menu>
			<Image style={styles.logo} preview={false} width="90px" size="large" src="/logo-dark.jpg"></Image>
			{nearbyCasesCount > 0 && <div style={styles.alert}>
				<AimOutlined style={styles.alertIcon} />
				{nearbyCasesCount} reported place(s) found 500 meters from your current location! Please be aware!
			</div>}
		</>
	);
}

export default connect(null, { fetchReportCases }) (withRouter(Navbar))
