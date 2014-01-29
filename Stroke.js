var Kinetic = Kinetic || {};

function Stroke(nodules)
{
    Kinetic.Shape.call(this, {
		fill: 'black',
		stroke: 'black'
	});
    this.nodules = nodules;
    this.refreshDrawFunc();
}
Kinetic.Util.extend(Stroke, Kinetic.Circle);

Stroke.prototype.drawFunc = function(context)
{
    var n = this.nodules;
    context.beginPath();
    context.moveTo(n[0].x(), n[0].y());
    for(var nod = 1; nod < n.length; nod++)
    {
        context.lineTo(n[nod].x(), n[nod].y());
    }
    for(nod = n.length - 2; nod >= 0 ; nod--)
    {
        context.lineTo(n[nod].x(), n[nod].y());
    }
    context.closePath();
    context.fillStrokeShape(this);
};

Stroke.prototype.refreshDrawFunc = function()
{
    this.sceneFunc(this.drawFunc);
};