import React from 'react'
import styles from './CourseCard.css'

const CourseCard = ({
	name,
	desc
}) => (
	<div className={styles.container}>
		{name}
		{desc}
	</div>
)

export default CourseCard
