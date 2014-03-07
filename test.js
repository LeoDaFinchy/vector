var Vector2 = Vector2 || {};
var Bezier = Bezier || {};
var Kinetic = Kinetic || {};
var VectorApp = VectorApp || {};
var MathUtil = MathUtil || {};
var Nodule = Nodule || {};
var V = Vector2;

$('document').ready(test);
    
var tracers = [];
var vec = [
];
var t = [];

function test(event)
{
    vec.push(new Nodule(VectorApp.width * 0.20, VectorApp.height * 0.50));
    vec.push(new Nodule(VectorApp.width * 0.40, VectorApp.height * 0.80));
    vec.push(new Nodule(VectorApp.width * 0.60, VectorApp.height * 0.20));
    vec.push(new Nodule(VectorApp.width * 0.80, VectorApp.height * 0.50));
    
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
    /*
    VectorApp.selected.selected.push(vec[0]);
    VectorApp.selected.selected.push(vec[1]);
    VectorApp.selected.selected.push(vec[2]);
    VectorApp.selected.selected.push(vec[3]);
    VectorApp.addStroke();
    */
    window.setTimeout(draw, 1000/30);
}

function draw()
{
    VectorApp.backLayer.draw();
    for(var l in VectorApp.layers)
    {
        VectorApp.layers[l].draw();
    }
    VectorApp.frontLayer.draw();
    
    var x = Bezier.cubicInterpolate(vec[0].attrs.x, vec[1].attrs.x, vec[2].attrs.x, vec[3].attrs.x, t);
    var y = Bezier.cubicInterpolate(vec[0].attrs.y, vec[1].attrs.y, vec[2].attrs.y, vec[3].attrs.y, t);
    var dx = Bezier.cubicDerivativeInterpolate(vec[0].attrs.x, vec[1].attrs.x, vec[2].attrs.x, vec[3].attrs.x, t);
    var dy = Bezier.cubicDerivativeInterpolate(vec[0].attrs.y, vec[1].attrs.y, vec[2].attrs.y, vec[3].attrs.y, t);
    
    var context = VectorApp.layers.Base.getContext();
    for(var trace in tracers)
    {
        tracers[trace].setAbsolutePosition({x: x[trace], y: y[trace]});
        
        var tangent = new V(dx[trace], dy[trace]).normalise().scale(10);
        context.beginPath();
        context.moveTo(x[trace] - tangent.x, y[trace] - tangent.y);
        context.lineTo(x[trace] + tangent.x, y[trace] + tangent.y);
        context.stroke();
        
        var normal = tangent.normal().scale(10);
        
        context.beginPath();
        context.moveTo(x[trace], y[trace]);
        context.lineTo(x[trace] + normal.x, y[trace] + normal.y);
        context.stroke();
    }
    
    
    
    
    window.setTimeout(draw, 1000/30);
}