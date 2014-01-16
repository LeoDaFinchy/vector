var Vector2 = Vector2 || {};
var Bezier = Bezier || {};
var Kinetic = Kinetic || {};
var VectorApp = VectorApp || {};
var MathUtil = MathUtil || {};
var V = Vector2;

$('document').ready(test);

function test(event)
{
    var vec = [
        new V(300, 200),
        new V(400, 300),
        new V(500, 100),
        new V(600, 200),
    ];
    
    var t = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    
    var x = Bezier.cubicInterpolate(vec[0].x, vec[1].x, vec[2].x, vec[3].x, t);
    var y = Bezier.cubicInterpolate(vec[0].y, vec[1].y, vec[2].y, vec[3].y, t);
    
    var x2 = Bezier.generalInterpolate([vec[0].x, vec[1].x, vec[2].x, vec[3].x], t);
    var y2 = Bezier.generalInterpolate([vec[0].y, vec[1].y, vec[2].y, vec[3].y], t);
    
    console.log(x, y);
    
    for(var v in x)
    {
        VectorApp.frontLayer.add(new Kinetic.Circle({x: x[v], y: y[v], fill: "lightblue", radius: 5}));
        VectorApp.frontLayer.add(new Kinetic.Circle({x: x2[v], y: y2[v] + 10, fill: "pink", radius: 5}));
    }
}