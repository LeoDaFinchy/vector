var Kinetic = Kinetic || {};

function Stroke(nodules)
{
    this.__proto__ = new Kinetic.Shape({
        fill: '#000000',
    });
    this.nodules = nodules;
}