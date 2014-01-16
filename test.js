var Vector2 = Vector2 || {};
var V = Vector2;

$('document').ready(test);

function test(event)
{
    var vec = new V(3, 6);
    console.log("vec", vec);
    var vec2 = vec.clone();
    console.log("vec2", vec2);
    var vec3 = new V(6,5);
    console.log("vec3", vec3);
    vec.add(vec3);
    console.log("vec add vec3", vec);
    var vec4 = vec2.clone().add(vec3);
    console.log("vec4", vec4);
    console.log("vec2", vec2);
    vec2.subtract(vec3);
    console.log("vec2", vec2);
    
    console.log(vec, vec4, V.displacement(vec, vec4), V.distance(vec, vec4));
    console.log(vec, vec.length());
}