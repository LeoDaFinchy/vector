var Vector2 = Vector2 || {};
var Stroke = Stroke || {};
var StrokeNode = StrokeNode || {};

/*function StrokeSegment(stroke, nodule, type)
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
}*/

function StrokeSegment(stroke, a, b)
{
    this.stroke = stroke;
    this.prev = a; a.next = this;
    this.next = b; b.prev = this;
    this.type = this.typeEnum.LINE;
}

/*StrokeSegment.prototype.addToEnd = function(segment)
{
    this.next.segment = segment;
    segment.prev.segment = this;
    return segment;
};

StrokeSegment.prototype.takeFromEnd = function()
{
    var segment = this.next.segment;
    this.next.segment = null;
    segment.prev.segment = null;
    return segment;
};*/

StrokeSegment.prototype.addDrawCommands = function(points, commands, forward)
{
    var next, prev;
    if(forward)
    {
        next = this.next;
        prev = this.prev;
    }
    else
    {
        next = this.prev;
        prev = this.next;
    }
    /*
    var start;
    var end;
    var normal;
    */
    /*if(!prev.segment) // provide the cap
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
    else*/ //provide the join
    /*{
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
    }*/
    
    if(this.type == this.typeEnum.LINE)
    {
        commands.push(Stroke.prototype.drawCommandsEnum.LINETO);
        points.push(next.nodule.getPosition().add(Vector2.displacement(prev.nodule.getPosition(), next.nodule.getPosition()).normal().scale(next.nodule.radius())));
        //points.push(next.segment.nodule.getPosition().add(Vector2.displacement(this.nodule.getPosition(), next.segment.nodule.getPosition()).normal().scale(next.segment.nodule.radius())));
    }
    /*else if(this.type == this.typeEnum.CURVE)
    {
        commands.push(Stroke.prototype.drawCommandsEnum.BEZIERCURVETO);
        
    }*/
};

StrokeSegment.prototype.getApproachNode = function(node)
{
    if(node == this.next)
    {
        if(this.type == this.typeEnum.LINE)
        {
            return this.prev.nodule;
        }
    }
    else
    {
        if(this.type == this.typeEnum.LINE)
        {
            return this.next.nodule;
        }
    }
};
/*
StrokeSegment.prototype.addNextwardTo = function(points, commands)
{
    this.addTo(points, commands, this.next, this.prev);
};

StrokeSegment.prototype.addPrevwardTo = function(points, commands)
{
    this.addTo(points, commands, this.prev, this.next);
};
*/

StrokeSegment.prototype.typeEnum = {
    LINE: 1,
    CURVE: 2,
};
