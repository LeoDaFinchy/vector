var Kinetic = Kinetic || {};
var $ = $ || {};

$('document').ready(DocReady);


var VectorApp = {
    width:800,
    height:450,
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
    VectorApp.frontLayer = new Kinetic.Layer();
    VectorApp.layers.Base = new Kinetic.Layer();
    
    VectorApp.stage.add(VectorApp.layers.Base);
    VectorApp.stage.add(VectorApp.frontLayer);
    
    $(".kineticjs-content")
        .on("mousewheel", onMouseWheel)
        .on("DOMMouseScroll", onDOMMouseScroll);
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