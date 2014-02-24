var Kinetic = Kinetic || {};
var Vector2 = Vector2 || {};
var StrokeSegment = StrokeSegment || {};
var StrokeNode = StrokeNode || {};

function Stroke(nodules)
{
    Kinetic.Shape.call(this, {
        fill: 'black',
        stroke: 'black',
    });
    
    this.firstNode = new StrokeNode(this, nodules[0]);
    this.lastNode = this.firstNode;
    for(var n = 1; n < nodules.length; n++)
    {
        new StrokeSegment(this, this.lastNode, new StrokeNode(this, nodules[n]));
        this.lastNode = this.lastNode.next.next;
    }
    this.draw = {
        points: [],
        commands: [],
    };
    
    this.refreshDrawFunc();
}
Kinetic.Util.extend(Stroke, Kinetic.Circle);

Stroke.prototype.drawCommandsEnum = {
    LINETO: 1,
    ARC: 2,
    BEZIERCURVETO: 3,
};

Stroke.prototype.addToEnd = function(nodule)
{
    new StrokeSegment(this, this.lastNode, new StrokeNode(this, nodule));
    this.lastNode = this.lastNode.next.next;
};

Stroke.prototype.drawFunc = function(context)
{
    if(this.draw.commands.length < 1) return;
    context.beginPath();
    context.moveTo(this.draw.points[0].x, this.draw.points[0].y);
    var p = 0;
    var c = 0;
    var pts = this.draw.points;
    while(c < this.draw.commands.length)
    {
        if(this.draw.commands[c] == this.drawCommandsEnum.LINETO)
        {
            context.lineTo(pts[p].x, pts[p].y);
            p++;
        }
        else if(this.draw.commands[c] == this.drawCommandsEnum.BEZIERCURVETO)
        {
            context.bezierCurveTo(pts[p].x, pts[p].y, pts[p + 1].x, pts[p + 1].y, pts[p + 2].x, pts[p + 2].y);
            p += 3;
        }
        else if(this.draw.commands[c] == this.drawCommandsEnum.ARC)
        {
            context.arc(pts[p].x, pts[p].y, pts[p + 1].radius, pts[p + 1].start, pts[p + 1].end);
            p += 2;
        }
        c++;
    }
    context.closePath();
    context.fillStrokeShape(this);
};

Stroke.prototype.refreshDrawFunc = function()
{
    this.draw.points = [];
    this.draw.commands = [];
    var b = this.firstNode;
    
    while(b.next)
    {
        b.addDrawCommands(this.draw.points, this.draw.commands, true);
        b = b.next;
    }
    while(b.prev)
    {
        b.addDrawCommands(this.draw.points, this.draw.commands, false);
        b = b.prev;
    }
};

Stroke.prototype.update = function()
{
    this.refreshDrawFunc();
};
