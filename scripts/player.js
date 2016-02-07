/* global setRequestHeader */
function play(idPlayer, path, genre) {
    sendData(JSON.stringify({genre : genre}), 'genre');
    
	path = htmlDecode(path);
    var player = document.getElementById(idPlayer);
	player.title = path;
	player.src = path;
	player.play();
}

function filterByGenre(genre, current)
{
    // tracking
    var previousGenreInput = document.getElementById('previousGenre');
    var currentGenreInput = document.getElementById('currentGenre');
    if (currentGenreInput.value)    
    {
        previousGenreInput.value = currentGenreInput.value;
        sendData(JSON.stringify({
            "from" : previousGenreInput.value,
            "to" : genre}), 'fromtogenre');
    }
    currentGenreInput.value = genre;    
    
    // display
    var musicList = document.getElementById('musicList');
	for(var i = 0; i < musicList.children.length; i++)
	{
		if (musicList.children[i].children[0].innerHTML != genre)
		{
			musicList.children[i].style.display = "none"
		}
		else
		{
			musicList.children[i].style.display = ""
		}
	}
    
    if (previousGenreInput.value)   document.getElementById(previousGenreInput.value).disabled = false;
    current.disabled = true;
}

function sendData(data, url) {
    var XHR = new XMLHttpRequest();

    // We define what will happen if the data are successfully sent
    /*XHR.addEventListener('load', function(event) {
    alert('Yeah! Data sent and response loaded.');
    });*/

    // We define what will happen in case of error
    /*XHR.addEventListener('error', function(event) {
    alert('Oups! Something goes wrong.');
    });*/

    // We setup our request
    XHR.open('POST', 'http://localhost:666/' + url);

    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.send(data);
}
