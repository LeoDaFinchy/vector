var Kinetic = Kinetic || {};
var Vector2 = Vector2 || {};
var StrokeSegment = StrokeSegment || {};

function Stroke(nodules)
{
    Kinetic.Shape.call(this, {
        fill: 'black',
        stroke: 'black',
    });
    this.segment = new StrokeSegment(this, nodules[0], StrokeSegment.prototype.typeEnum.LINE);
    this.lastSegment = this.segment;
    this.sceneFunc(this.drawFunc);
    
    for(var n = 1; n < nodules.length; n++)
    {
        this.lastSegment.append(new StrokeSegment(this, nodules[n], StrokeSegment.prototype.typeEnum.LINE));
        this.lastSegment = this.lastSegment.next.segment;
    }
    
    this.draw = {
        points: [],
        commands: [],
    };
    
    this.refreshDrawFunc();
}
Kinetic.Util.extend(Stroke, Kinetic.Circle);

Stroke.prototype.drawCommandsEnum = {
    LINETO: 0,
    ARC: 1,
    BEZIERCURVETO: 2,
};

Stroke.prototype.addToEnd = function(nodule, type)
{
    this.lastSegment.addToEnd(new StrokeSegment(this, nodule, type));
    this.lastSegment = this.lastSegment.next.segment;
};

Stroke.prototype.takeFromEnd = function()
{
    this.lastSegment = this.lastSegment.prev.segment;
    this.lastSegment.takeFromEnd();
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
    //context.stroke();
    context.fillStrokeShape(this);
};

Stroke.prototype.refreshDrawFunc = function()
{
    this.draw.points = [];
    this.draw.commands = [];
    var s = this.segment;
    
    while(s.next.segment)
    {
        s.addNextwardTo(this.draw.points, this.draw.commands);
        s = s.next.segment;
    }
    while(s.prev.segment)
    {
        s.addPrevwardTo(this.draw.points, this.draw.commands);
        s = s.prev.segment;
    }
};

Stroke.prototype.update = function()
{
    this.refreshDrawFunc();
};
