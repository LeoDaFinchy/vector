var Kinetic = Kinetic || {};
var VectorApp = VectorApp || {};

function Nodule(x, y)
{
	this.__proto__ = new Kinetic.Circle({
		x: x,
		y: y,
		radius: 5,
		fill: '#ff00ff',
	});
	this.setDraggable(true);
	this.on('click', noduleClicked(this));
}

function noduleClicked(nodule)
{
    VectorApp.noduleClicked(nodule);
}