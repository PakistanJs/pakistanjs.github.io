import React, { createElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { Paragraph, Heading, Image } from 'components/core'
import VideoWidget from 'components/VideoWidget'
import Quiz from 'components/Quiz'

const HEADING_SIZE = {
	1: 'xlarge',
	2: 'large',
	3: 'medium',
	4: 'small'
}

const generateQuizObject = (str) => {
	const objList = str.split(/\n/).filter(s => s && s.length)
	let formattedObjectList = {}
	objList.forEach(obj => {
		const [key, value] = obj.split(':')

		if (obj) {
			formattedObjectList[key] = value.trim()
		}
	})

	return formattedObjectList
}

const PreviewMarkdown = ({ children }) => (
	<ReactMarkdown
		source={children}
		escapeHtml
		renderers={{
			HtmlBlock: (props) => {
				return <div dangerouslySetInnerHTML={{ __html: props.literal }} />
			},
			CodeBlock: (props) => {
				const {
					language,
					literal
				} = props

				switch (language) {
					case 'youtube':
						return <VideoWidget videoUrl={literal} />
						break
					case 'quiz':
						const quizObj = generateQuizObject(literal)
						return <Quiz {...quizObj} />
						break
					default:
						const className = language && 'language-' + language
						const code = createElement('code', { className: className }, literal)
						return createElement('pre', props, code)
				}
			},
			Heading: ({ level, children }) => {
				return <Heading size={HEADING_SIZE[level]}>{children}</Heading>
			},
			Paragraph: (props) => {
				const { children } = props
				// Ugly custom nodes hack here
				// TODO: Clean this up
				if (
					children.length > 1 &&
					children[0].props &&
					children[0].props.literal == '<youtube>'
				) {
					// https://www.youtube.com/embed/kBAga6emvGw
					return <VideoWidget videoUrl={children[1]} />
				}
				return <Paragraph>{children}</Paragraph>
			}
		}}
	/>
)

export default PreviewMarkdown
