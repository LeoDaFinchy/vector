var Vector2 = Vector2 || {};
var Stroke = Stroke || {};
var StrokeNode = StrokeNode || {};

function StrokeSegment(stroke, a, b)
{
    this.stroke = stroke;
    this.prev = a; a.next = this;
    this.next = b; b.prev = this;
    this.anchors = [];
    this.type = this.typeEnum.LINE;
}

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
    
    if(this.type == this.typeEnum.LINE)
    {
        commands.push(Stroke.prototype.drawCommandsEnum.LINETO);
        points.push(next.nodule.getPosition().add(Vector2.displacement(prev.nodule.getPosition(), next.nodule.getPosition()).normal().scale(next.nodule.radius())));
    }
};

StrokeSegment.prototype.getApproachNode = function(node)
{
    if(node == this.next)
    {
        if(this.type == this.typeEnum.LINE)
        {
            return this.prev.nodule;
        }
        else if(this.type == this.typeEnum.CURVE)
        {
            return this.anchors[this.anchors.length - 1];
        }
    }
    else
    {
        if(this.type == this.typeEnum.LINE)
        {
            return this.next.nodule;
        }
        else if(this.type == this.typeEnum.CURVE)
        {
            return this.anchors[0];
        }
    }
};

StrokeSegment.prototype.typeEnum = {
    LINE: 1,
    CURVE: 2,
};
