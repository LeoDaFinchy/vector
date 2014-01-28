var Kinetic = Kinetic || {};

function Stroke(nodules)
{
    Kinetic.Shape.call(this, {
		fill: '#000000',
	});
    this.nodules = nodules;
}
Kinetic.Util.extend(Stroke, Kinetic.Circle);