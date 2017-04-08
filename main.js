const youtubeVideoOptions = {
	theme: 'light',
	color: 'white',
	showinfo: false
}

//<div>
//	<iframe src=""></iframe>
//	<div>
//		<div>title</div>
//		<div>details</div>
//	</div>
//</div>
function createVideoWidget({ videoUrl, title, desc }, youtubeVideoOptions) {
	// create all elements
	const $videoWidget           = document.createElement('div')
	const $videoContainer        = document.createElement('iframe')
	const $videoDetailsContainer = document.createElement('div')
	const $videoTitle            = document.createElement('div')
	const $videoDesc             = document.createElement('div')

	// populate all elements with class names
	$videoWidget.className           = 'video__widget'
	$videoContainer.className        = 'video__container'
	$videoDetailsContainer.className = 'details__containers'
	$videoTitle.className            = 'details__title'
	$videoDesc.className             = 'details__desc'

	let iframeSrc = `${videoUrl}?`
	Object
		.keys(youtubeVideoOptions)
		.forEach(option => iframeSrc += `${option}=${youtubeVideoOptions[option]}&`)

	$videoContainer.setAttribute('src', iframeSrc)
	$videoContainer.setAttribute('width', 550)
	$videoContainer.setAttribute('height', 310)
	$videoContainer.setAttribute('frameborder', 0)

	$videoTitle.innerHTML = title
	$videoDesc.innerHTML = desc

	// append elements to create widget
	$videoDetailsContainer.appendChild($videoTitle)
	$videoDetailsContainer.appendChild($videoDesc)

	$videoWidget.appendChild($videoContainer)
	$videoWidget.appendChild($videoDetailsContainer)

	return $videoWidget;
}

document.addEventListener('DOMContentLoaded', () => {
	// get video list container
	const $videoList = document.getElementById('videoList')

	fetch('http://api.pakistanjs.com/video/list')
		.then(res => res.json())
		.then(videos => {
			videos.forEach(video => $videoList.appendChild(createVideoWidget(video, youtubeVideoOptions)));
		})
})