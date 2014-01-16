var Vector2 = Vector2 || {};
var V = Vector2;

$('document').ready(test);

function test(event)
{
    var vec = new V(3, 6);
    console.log(vec);
    var vec2 = vec.clone();
    console.log(vec2);
}