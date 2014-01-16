var Vector2 = Vector2 || {};
var Bezier = Bezier || {};
var Kinetic = Kinetic || {};
var VectorApp = VectorApp || {};
var V = Vector2;

$('document').ready(test);

function test(event)
{
    var vec = [
        new V(300, 100),
        new V(600, 100),
    ];
    
    var t = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    
    var x = Bezier.linearInterpolate(vec[0].x, vec[1].x, t);
    var y = Bezier.linearInterpolate(vec[0].y, vec[1].y, t);
    
    for(var v in x)
    {
        VectorApp.frontLayer.add(new Kinetic.Circle({x: x[v], y: y[v], fill: "lightblue", radius: 5}));
    }
}