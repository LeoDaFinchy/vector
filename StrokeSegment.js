var Vector2 = Vector2 || {};
var Stroke = Stroke || {};
var StrokeNode = StrokeNode || {};
var Bezier = Bezier || {};

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
        points.push(
            next.nodule.getPosition()
                .add(
                    Vector2.displacement(prev.nodule.getPosition(), next.nodule.getPosition())
                        .normal()
                        .scale(next.nodule.radius())
                    )
            );
    }
    else if(this.type == this.typeEnum.CURVE)
    {
        commands.push(Stroke.prototype.drawCommandsEnum.BEZIERCURVETO);
        
        var anchorA = this.getApproachNode(prev);
        var anchorB = this.getApproachNode(next);
        
        var third = 1.0/3.0;
        var dX = Bezier.cubicDerivativeInterpolate(
            prev.nodule.getPosition().x,
            anchorA.nodule.getPosition().x,
            anchorB.nodule.getPosition().x,
            next.nodule.getPosition().x,
            [third, third * 2, 1]
            );
        var dY = Bezier.cubicDerivativeInterpolate(
            prev.nodule.getPosition().y,
            anchorA.nodule.getPosition().y,
            anchorB.nodule.getPosition().y,
            next.nodule.getPosition().y,
            [third, third * 2, 1]
            );
        var normalA = new Vector2(dX[0], dY[0]).normal().scale(anchorA.nodule.radius());
        var normalB = new Vector2(dX[1], dY[1]).normal().scale(anchorB.nodule.radius());
        var normalC = new Vector2(dX[2], dY[2]).normal().scale(next.nodule.radius());
        points.push(anchorA.nodule.getPosition().add(normalA));
        points.push(anchorB.nodule.getPosition().add(normalB));
        points.push(next.nodule.getPosition().add(normalC));
    }
};

StrokeSegment.prototype.getApproachNode = function(node)
{
    if(node == this.next)
    {
        if(this.type == this.typeEnum.LINE)
        {
            return this.prev;
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
            return this.next;
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
