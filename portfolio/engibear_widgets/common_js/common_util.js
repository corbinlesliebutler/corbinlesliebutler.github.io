CommonUtil = {};

CommonUtil.randomInt = function(len)
{
	return Math.floor(Math.random()*len);
}

CommonUtil.distance = function(x1, y1, x2, y2)
{
	return Math.hypot(x1-x2, y1-y2);
}

CommonUtil.directionDeg = function(x1, y1, x2, y2)
{
	return Math.atan2(y2 - y1, x2 -x1) * 180 / Math.PI;
}

CommonUtil.directionRad = function(x1, y1, x2, y2)
{
	return Math.atan2(y2 - y1, x2 -x1);
}
