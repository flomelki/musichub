function play(idPlayer, path) {
	path = htmlDecode(path)
    var player = document.getElementById(idPlayer);
	player.title = path;
	player.src = path;
	player.play();
}

function filterByGenre(genre, trackingGenreTag, current)
{
    // tracking
    var trackingGenreInput = document.getElementById(trackingGenreTag);
    var previousGenreInput = document.getElementById('previousGenre');
    var currentGenreInput = document.getElementById('currentGenre');
    if (currentGenreInput.value)    
    {
        previousGenreInput.value = currentGenreInput.value;
        trackingGenreInput.value = JSON.stringify({
            "from" : previousGenreInput.value,
            "to" : genre
        });
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
}

