var Kinetic = Kinetic || {};
var VectorApp = VectorApp || {};
var Vector2 = Vector2 || {};

function Nodule(x, y)
{
    Kinetic.Circle.call(this, {
        x: x,
        y: y,
        radius: 5,
        strokeWidth: 1,
        stroke: "black",
        strokeEnabled: false,
    });
    this.setDraggable(true);
    this.setNotHovered();
    this.on('click', this.clicked);
    this.on('dragmove', this.moved);
    this.on('mouseover', this.mouseover);
    this.strokeNodes = [];
}
Kinetic.Util.extend(Nodule, Kinetic.Circle);

Nodule.prototype.setSelected = function()
{
    this.strokeEnabled(true);
};

Nodule.prototype.setNotSelected = function()
{
    this.strokeEnabled(false);
};

Nodule.prototype.setHovered = function()
{
    this.setFillRGBA([0.6, 0.8, 1.0, 0.5]);
};

Nodule.prototype.setNotHovered = function()
{
    this.setFillRGBA([0.2, 0.6, 1.0, 0.5]);
};

Nodule.prototype.clicked = function(event)
{
    VectorApp.selected.select(this, event);
    event.cancelBubble = true;
};

Nodule.prototype.moved = function(event)
{
    this.updateStrokes();
};

Nodule.prototype.mouseover = function(event)
{
    VectorApp.mouseover(this);
};

Nodule.prototype.mouseout = function(event)
{
    VectorApp.mouseout(this);
};

Nodule.prototype.getPosition = function()
{
    return new Vector2(this.x(), this.y());
};

Nodule.prototype.modRadius = function(r)
{
    Kinetic.Circle.prototype.radius.call(this, Math.max(r, 0.5));
    var nod = this;
    nod.hitFunc(function(context) {
        context.beginPath();
        context.arc(0, 0, Math.max(r, 5), 0, Math.PI*2);
        context.closePath();
        context.fillStrokeShape(nod);
    });
    this.updateStrokes();
};

Nodule.prototype.updateStrokes = function()
{
    for(var s = 0; s < this.strokeNodes.length; s++)
    {
        this.strokeNodes[s].stroke.update();
    }
};

Nodule.prototype.setFillRGBA = function(rgba)
{
    this.fill('rgba(' + Math.round(rgba[0] * 255)+','+Math.round(rgba[1] * 255)+','+Math.round(rgba[2] * 255)+','+rgba[3]+')');
};

