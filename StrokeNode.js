var Vector2 = Vector2 || {};
var Stroke = Stroke || {};
var StrokeSegment = StrokeSegment || {};

function StrokeNode(stroke, nodule)
{
    this.stroke = stroke;
    this.nodule = nodule;
    nodule.strokeNodes.push(this);
    this.type = this.typeEnum.ROUND;
    this.next = null;
    this.prev = null;
}

StrokeNode.prototype.addDrawCommands = function(points, commands, forward)
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
    
    var start, prevNode, end, nextNode, normal;
    if(next && prev)
    {
        if(this.type == this.typeEnum.ROUND)
        {
            prevNode = prev.getApproachNode(this);
            normal = Vector2.displacement(prevNode.getPosition(), this.nodule.getPosition()).normal();
            start = normal.angle();                                                             //Needs refinement, doesn't take nodule size difference into account
            
            nextNode = next.getApproachNode(this);
            normal = Vector2.displacement(this.nodule.getPosition(), nextNode.getPosition()).normal();
            end = normal.angle();
            
            points.push(new Vector2(this.nodule.x(), this.nodule.y()));
            points.push({radius: this.nodule.radius(), start: start, end: end});
            commands.push(Stroke.prototype.drawCommandsEnum.ARC);
        }
    }
    else
    {
        var nearNode;
        if(this.type == this.typeEnum.ROUND)
        {
            if(next)
            {
                nearNode = next.getApproachNode(this);
            }
            else
            {
                nearNode = prev.getApproachNode(this);
            }
            normal = Vector2.displacement(nearNode.getPosition(), this.nodule.getPosition()).normal();
            start = normal.angle();                                                             //Needs refinement, doesn't take nodule size difference into account
            
            normal = Vector2.displacement(this.nodule.getPosition(), nearNode.getPosition()).normal();
            end = normal.angle();
            
            points.push(new Vector2(this.nodule.x(), this.nodule.y()));
            points.push({radius: this.nodule.radius(), start: start, end: end});
            commands.push(Stroke.prototype.drawCommandsEnum.ARC);
        }
    }
};

StrokeNode.prototype.typeEnum = {
    ROUND: 1,
    FLAT: 2,
    CAPPED: 3,
    POINTED: 4,
    EXTRAPOLATED: 5,
};