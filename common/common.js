htmlEncode = function(s)
{
return s.replaceAll("'", '&#39;');
}  

htmlDecode = function(s)
{
	return s.replaceAll('&#39;', "'")
}