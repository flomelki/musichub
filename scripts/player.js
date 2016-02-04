function play(idPlayer, path) {
	path = htmlDecode(path)
    var player = document.getElementById(idPlayer);
	player.title = path;
	player.src = path;
	player.play();
}

function filterByGenre(genre)
{
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

