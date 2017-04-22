const $videoList = document.getElementById('videoList')
const $playlists = document.querySelector('#playLists > .topics')

const youtubeVideoOptions = {
	theme: 'light',
	color: 'white',
	showinfo: false
}

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

function createPlaylistItem(playlist) {
	const $link = document.createElement('a')

	$link.innerHTML = playlist.title
	$link.href = `#${playlist.id}`

	return $link;
}

function renderVideoList() {
	const { hash } = window.location
	let playlistId = hash && hash.length > 1 ? hash.slice(1) : $playlists.firstChild.href.split('#')[1]

	$videoList.innerHTML = null

	fetch(`http://api.pakistanjs.com/${playlistId}/list`)
		.then(res => res.json())
		.then(videos => {
			videos.forEach(video => $videoList.appendChild(createVideoWidget(video, youtubeVideoOptions)));
		})
}

document.addEventListener('DOMContentLoaded', () => {
	fetch('http://api.pakistanjs.com/playlists')
		.then(res => res.json())
		.then(playlists => {
			playlists.forEach(playlist => $playlists.appendChild(createPlaylistItem(playlist)));

			setTimeout(renderVideoList, 100)
		})

	window.onhashchange = renderVideoList;
})
