var Vector2 = Vector2 || {};
var Bezier = Bezier || {};
var Kinetic = Kinetic || {};
var VectorApp = VectorApp || {};
var MathUtil = MathUtil || {};
var Nodule = Nodule || {};
var V = Vector2;

$('document').ready(test);

function test(event)
{
    var vec = [
        new V(300, 200),
        new V(400, 250),
        new V(500, 150),
        new V(600, 200),
    ];
    
    var t = [];
    for(var i = -2.0; i <= 3.0; i += 0.1)
    {
        t.push(i);
    }
    
    var x = Bezier.cubicInterpolate(vec[0].x, vec[1].x, vec[2].x, vec[3].x, t);
    var y = Bezier.cubicInterpolate(vec[0].y, vec[1].y, vec[2].y, vec[3].y, t);
    
    var x2 = Bezier.generalInterpolate([vec[0].x, vec[1].x, vec[2].x, vec[3].x], t);
    var y2 = Bezier.generalInterpolate([vec[0].y, vec[1].y, vec[2].y, vec[3].y], t);
    
    for(var v in x)
    {
        VectorApp.frontLayer.add(new Kinetic.Circle({x: x[v], y: y[v], fill: "lightblue", radius: 5}));
        VectorApp.frontLayer.add(new Kinetic.Circle({x: x2[v], y: y2[v] + 10, fill: "pink", radius: 5}));
    }
}