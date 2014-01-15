var Kinetic = Kinetic || {};
var $ = $ || {};

$('document').ready(DocReady);


var VectorApp = {
    width:800,
    height:450,
    stage:null,
    layers:{},
    backLayer:null,
    frontLayer:null,
};

function DocReady(event)
{
    VectorApp.stage = new Kinetic.Stage({
        container: 'container',
        width: VectorApp.width,
        height: VectorApp.height,
    });
    VectorApp.backLayer = new Kinetic.Layer();
    VectorApp.frontLayer = new Kinetic.Layer();
    VectorApp.layers.Base = new Kinetic.Layer();
    
    VectorApp.stage.add(VectorApp.backLayer);
    VectorApp.stage.add(VectorApp.layers.Base);
    VectorApp.stage.add(VectorApp.frontLayer);
}