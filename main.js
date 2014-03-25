var Kinetic = Kinetic || {};
var VectorApp = VectorApp || {};
var Nodule = Nodule || {};
var Stroke = Stroke || {};
var Selection = Selection || {};
var $ = $ || {};

$('document').ready(DocReady);



function DocReady(event)
{
    VectorApp.width = $('#container').width();
    VectorApp.height = $('#container').height();
    VectorApp.stage = new Kinetic.Stage({
        container: 'container',
        width: VectorApp.width,
        height: VectorApp.height,
    });
    VectorApp.top = $('#container').offset().top;
    VectorApp.left = $('#container').offset().left;
    VectorApp.frontLayer = new Kinetic.Layer();
    VectorApp.backLayer = new Kinetic.Layer();
    VectorApp.layers.Base = new Kinetic.Layer();
    
    VectorApp.stage.add(VectorApp.backLayer);
    VectorApp.stage.add(VectorApp.layers.Base);
    VectorApp.stage.add(VectorApp.frontLayer);

    VectorApp.backLayer.add(new Kinetic.Rect({
        x: 0,
        y: 0,
        width: VectorApp.width,
        height: VectorApp.height,
        fill: '#f9f9f9',
        })
    );
    
    VectorApp.selected = new Selection();
    
    VectorApp.setListeners();
}