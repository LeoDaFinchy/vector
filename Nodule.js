var Kinetic = Kinetic || {};
var VectorApp = VectorApp || {};
var Vector2 = Vector2 || {};

function Nodule(x, y)
{
    Kinetic.Circle.call(this, {
        x: x,
        y: y,
        radius: 20,
        fill: '#ff00ff',
        strokeWidth: 1,
        stroke: "black",
        strokeEnabled: false,
    });
    this.setDraggable(true);
    this.on('click', this.noduleClicked);
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

Nodule.prototype.noduleClicked = function(event)
{
    VectorApp.selected.select(this, event);
    event.cancelBubble = true;
};

Nodule.prototype.getPosition = function()
{
    return new Vector2(this.x(), this.y());
};