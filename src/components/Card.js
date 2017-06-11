import React from 'react'
import styles from './Card.css'
import { Paragraph, Heading, Image } from 'components/core'

const Card = ({ title, desc, imgSrc }) => (
	<div className={styles.container}>
		{imgSrc ? <Image className={styles.thumb} src={imgSrc} /> : null}
		<div className={styles.bottom}>
			<Heading size="medium">{title}</Heading>
			<Paragraph>{desc}</Paragraph>
		</div>
	</div>
)


export default Card
