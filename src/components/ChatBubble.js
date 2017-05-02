import React from 'react'
import styles from './ChatBubble.css'

const ChatBubble = () => (
	<a className={`${styles.chatWidget} js-gitter-toggle-chat-button`} data-gitter-toggle-chat-state="true">
		<svg className={styles.chatIcon} viewBox="0 0 58 58">
			<g>
				<path style={{ fill: '#26B99A' }} d="M53,3.293H5c-2.722,0-5,2.278-5,5v33c0,2.722,2.278,5,5,5h27.681l-4.439-5.161
					c-0.36-0.418-0.313-1.05,0.106-1.41c0.419-0.36,1.051-0.312,1.411,0.106l4.998,5.811L43,54.707v-8.414h2h6h2c2.722,0,5-2.278,5-5
					v-33C58,5.571,55.722,3.293,53,3.293z"/>
				<circle style={{ fill: '#FFFFFF' }} cx="15" cy="24.799" r="3"/>
				<circle style={{ fill: '#FFFFFF' }} cx="29" cy="24.799" r="3"/>
				<circle style={{ fill: '#FFFFFF' }} cx="43" cy="24.799" r="3"/>
			</g>
		</svg>
		Open Chat
	</a>
)

export default ChatBubble
