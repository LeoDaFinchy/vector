var Vector2 = Vector2 || {};
var Bezier = Bezier || {};
var Kinetic = Kinetic || {};
var VectorApp = VectorApp || {};
var MathUtil = MathUtil || {};
var Nodule = Nodule || {};
var V = Vector2;

//$('document').ready(test);
    
var tracers = [];
var vec = [
];
var t = [];

function test(event)
{
    vec.push(new Nodule(VectorApp.width * 0.10, VectorApp.height * 0.50));
    vec.push(new Nodule(VectorApp.width * 0.05, VectorApp.height * 0.80));
    vec.push(new Nodule(VectorApp.width * 0.95, VectorApp.height * 0.20));
    vec.push(new Nodule(VectorApp.width * 0.90, VectorApp.height * 0.50));
    
    for(var n in vec)
    {
        VectorApp.frontLayer.add(vec[n]);
    }
    
    for(var i = 0.1; i <= 0.9; i += 0.1)
    {
        t.push(i);
    }
    
    var x = Bezier.cubicInterpolate(vec[0].attrs.x, vec[1].attrs.x, vec[2].attrs.x, vec[3].attrs.x, t);
    var y = Bezier.cubicInterpolate(vec[0].attrs.y, vec[1].attrs.y, vec[2].attrs.y, vec[3].attrs.y, t);
    
    for(var v in x)
    {
        var trace = new Nodule(x[v], y[v]);
        trace.setDraggable(false);
        tracers.push(trace);
        VectorApp.frontLayer.add(trace);
    }
    
    VectorApp.selected.selected.push(vec[0]);
    VectorApp.selected.selected.push(vec[1]);
    VectorApp.selected.selected.push(vec[2]);
    VectorApp.selected.selected.push(vec[3]);
    VectorApp.addStroke();
    
    window.setTimeout(refreshTracers, 1000/30);
}

function refreshTracers()
{
    var x = Bezier.cubicInterpolate(vec[0].attrs.x, vec[1].attrs.x, vec[2].attrs.x, vec[3].attrs.x, t);
    var y = Bezier.cubicInterpolate(vec[0].attrs.y, vec[1].attrs.y, vec[2].attrs.y, vec[3].attrs.y, t);
    
    for(var trace in tracers)
    {
        tracers[trace].setAbsolutePosition({x: x[trace], y: y[trace]});
    }
    
    window.setTimeout(refreshTracers, 1000/30);
}
