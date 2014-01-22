var Kinetic = Kinetic || {};

function Nodule(x, y)
{
	this.__proto__ = new Kinetic.Circle({
		x: x,
		y: y,
		radius: 5,
		fill: '#ff00ff',
	});
	this.setDraggable(true);
}