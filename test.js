var Vector2 = Vector2 || {};
var Bezier = Bezier || {};
var V = Vector2;

$('document').ready(test);

function test(event)
{
    var vec = new V(3, 6);
    console.log("vec", vec);
    var vec2 = new V(6, 5);
    console.log("vec2", vec2);
    
    console.log(Bezier.linearInterpolate(vec.x, vec2.x, [0, 1, 0.5, 0.1, 0.9, 2.45]));
}