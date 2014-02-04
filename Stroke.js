var Kinetic = Kinetic || {};
var Vector2 = Vector2 || {};

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

/******************************************************************************/
/*                  StrokeSegment                                             */
/******************************************************************************/

function StrokeSegment(stroke, nodule, type)
{
    this.stroke = stroke;
    this.nodule = nodule;
    nodule.strokes.push(stroke);
    this.type = type;
    this.next = {
        join: this.joinEnum.ROUND,
        segment: null,
    };
    this.prev = {
        join: this.joinEnum.ROUND,
        segment: null,
    };
}

StrokeSegment.prototype.append = function(segment)
{
    this.next.segment = segment;
    segment.prev.segment = this;
    return segment;
};

StrokeSegment.prototype.addTo = function(points, commands, next, prev)
{
    var start;
    var end;
    var normal;
    if(!prev.segment) // provide the cap
    {
        if(this.prev.join == this.joinEnum.ROUND)
        {
            start = 0;
            end = 0;
            if(this.type == this.typeEnum.LINE) //does this matter?
            {
                normal = Vector2.displacement(this.nodule.getPosition(), next.segment.nodule.getPosition()).normal();
                end = normal.angle();                                                               //Needs refinement, doesn't take nodule size difference into account
                start = normal.scale(-1).angle();
            }
            points.push(new Vector2(this.nodule.x(), this.nodule.y()));
            points.push({radius: this.nodule.radius(), start: start, end: end});
            commands.push(Stroke.prototype.drawCommandsEnum.ARC);
        }
    }
    else //provide the join
    {
        if(this.prev.join == this.joinEnum.ROUND)
        {
            start = 0;
            end = 0;
            if(this.type == this.typeEnum.LINE) //does this matter?
            {
                normal = Vector2.displacement(this.nodule.getPosition(), next.segment.nodule.getPosition()).normal();
                end = normal.angle();                                                               //Needs refinement, doesn't take nodule size difference into account
                normal = Vector2.displacement(prev.segment.nodule.getPosition(), this.nodule.getPosition()).normal();
                start = normal.angle();
            }
            points.push(new Vector2(this.nodule.x(), this.nodule.y()));
            points.push({radius: this.nodule.radius(), start: start, end: end});
            commands.push(Stroke.prototype.drawCommandsEnum.ARC);
        }
    }
    
    if(this.type == this.typeEnum.LINE)
    {
        commands.push(Stroke.prototype.drawCommandsEnum.LINETO);
        points.push(next.segment.nodule.getPosition().add(Vector2.displacement(this.nodule.getPosition(), next.segment.nodule.getPosition()).normal().scale(next.segment.nodule.radius())));
    }
    else if(this.type == this.typeEnum.CURVE)
    {
        commands.push(Stroke.prototype.drawCommandsEnum.BEZIERCURVETO);
        
    }
};

StrokeSegment.prototype.addNextwardTo = function(points, commands)
{
    this.addTo(points, commands, this.next, this.prev);
};

StrokeSegment.prototype.addPrevwardTo = function(points, commands)
{
    this.addTo(points, commands, this.prev, this.next);
};

StrokeSegment.prototype.joinEnum = {
    ROUND: 0,
    FLAT: 1,
    CAPPED: 2,
    POINTED: 3,
    EXTRAPOLATED: 4,
};

StrokeSegment.prototype.typeEnum = {
    LINE: 0,
    CURVE: 0,
};
