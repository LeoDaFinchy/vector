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
    this.strokes = [];
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
    this.fill('#99ccff');
};

Nodule.prototype.setNotHovered = function()
{
    this.fill('#336699');
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
    Kinetic.Circle.prototype.radius.call(this, r);
    this.updateStrokes();
};

Nodule.prototype.updateStrokes = function()
{
    for(var s = 0; s < this.strokes.length; s++)
    {
        this.strokes[s].update();
    }
};