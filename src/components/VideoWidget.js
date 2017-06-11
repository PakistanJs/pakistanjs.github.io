import React from 'react'
import styles from './VideoWidget.css'

const VideoWidget = ({ videoUrl, title, desc }) => (
	<div className={styles.videoWidget}>
		<iframe
			src={`${videoUrl}?theme=light&color=white&showinfo=0`}
			width="720"
			height="360"
			frameBorder="0"
		/>
		<div className={styles.detailsContainers}>
			<div className={styles.detailsTitle}>
				{title}
			</div>
			<div className={styles.detailsDesc}>
				{desc}
			</div>
		</div>
	</div>
)

export default VideoWidget
