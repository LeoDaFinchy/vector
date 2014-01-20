var Kinetic = Kinetic || {};
var Nodule = Nodule || {};
var $ = $ || {};

$('document').ready(DocReady);


var VectorApp = {
    width:800,
    height:450,
    left:0,
    top:0,
    stage:null,
    layers:{},
    frontLayer:null,
};

function DocReady(event)
{
    VectorApp.stage = new Kinetic.Stage({
        container: 'container',
        width: VectorApp.width,
        height: VectorApp.height,
    });
    VectorApp.top = $('#container').offset().top;
    VectorApp.left = $('#container').offset().left;
    VectorApp.frontLayer = new Kinetic.Layer();
    VectorApp.layers.Base = new Kinetic.Layer();
    
    VectorApp.stage.add(VectorApp.layers.Base);
    VectorApp.stage.add(VectorApp.frontLayer);
    
    $(".kineticjs-content")
        .on("mousewheel", onMouseWheel)
        .on("DOMMouseScroll", onDOMMouseScroll)
        ;
    VectorApp.stage.on('click', onClick);
        
    window.setTimeout(draw, 100);
}

function draw()
{
    for(var l in VectorApp.layers)
    {
        VectorApp.layers[l].draw();
    }
    VectorApp.frontLayer.draw();
    
    window.setTimeout(draw, 100);
}

function onMouseWheel(event)
{
    onMouseScroll(event, event.originalEvent.wheelDelta / 120);
}
function onDOMMouseScroll(event)
{
    onMouseScroll(event, event.originalEvent.detail / -3);
}
function onMouseScroll(event, delta)
{
    console.log(delta);
}
function onClick(event)
{
    var nod = new Nodule(event.pageX - VectorApp.left, event.pageY - VectorApp.top);
    VectorApp.frontLayer.add(nod);
}