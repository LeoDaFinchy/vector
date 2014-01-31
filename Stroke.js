var Kinetic = Kinetic || {};

function Stroke(nodules)
{
    Kinetic.Shape.call(this, {
		fill: 'black',
		stroke: 'black',
	});
    this.nodules = nodules;
	this.sceneFunc(this.drawFunc);
	this.draw = {
		points: [],
		commands: [],
		commandsEnum: {
			LINE: 0,
			CURVE: 1,
		},
	};
    this.refreshDrawFunc();
}
Kinetic.Util.extend(Stroke, Kinetic.Circle);

Stroke.prototype.drawFunc = function(context)
{
    var n = this.nodules;
    context.beginPath();
    context.moveTo(n[0].x(), n[0].y()); //temporary
    var p = 0;
	var c = 0;
	var pts = this.draw.points;
	/*while(c < this.draw.commands.length)
	{
		if(this.draw.commands[c] = this.draw.commandsEnum.LINE)
		{
			context.lineTo(pts[p].x, pts[p].y);
			p++;
		}
		else if(this.draw.commands[c] === this.draw.commands.CURVE)
		{
			context.bezierTo(pts[p].x, pts[p].y, pts[p + 1].x, pts[p + 1].y, pts[p + 2].x, pts[p + 2].y);
			p += 3;
		}
	*/
	/*
	for(var nod = 1; nod < n.length; nod++)
    {
        context.lineTo(n[nod].x(), n[nod].y());
    }
    for(nod = n.length - 2; nod >= 0 ; nod--)
    {
        context.lineTo(n[nod].x(), n[nod].y());
    }
	*/
    context.closePath();
    context.fillStrokeShape(this);
};

Stroke.prototype.refreshDrawFunc = function()
{
	this.draw.points = [];
	this.draw.commands = [
		this.draw.commandsEnum.LINE,
		this.draw.commandsEnum.CURVE,
		this.draw.commandsEnum.LINE,
		this.draw.commandsEnum.CURVE,
	];
	var n = this.nodules;
	for(var nod = 0; nod < n.length; nod++)
    {
        this.draw.points.push(new Vector2(n[nod].x, n[nod].y + 3));
    }
    for(nod = n.length - 1; nod >= 0 ; nod--)
    {
        this.draw.points.push(new Vector2(n[nod].x, n[nod].y - 3));
    }
	
    //this.sceneFunc(this.drawFunc);
};
