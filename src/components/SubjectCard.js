import React from 'react'
import styles from './SubjectCard.css'
import { Paragraph, Heading, Image } from 'components/core'

const SubjectCard = ({ title, desc, imgSrc }) => (
	<div className={styles.container}>
		<div className={styles.content}>
			<Heading size="medium">{title}</Heading>
			<Paragraph>{desc}</Paragraph>
		</div>
		<div className={styles.footer}>
			<div>2% Progress</div>
			<div>Start now</div>
		</div>
	</div>
)


export default SubjectCard
