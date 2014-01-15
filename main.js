var Kinetic = Kinetic || {};
var $ = $ || {};

$('document').ready(DocReady);


var VectorApp = {
    width:800,
    height:450,
    stage:null,
};

function DocReady(event)
{
    VectorApp.stage = new Kinetic.Stage({
        container: 'container',
        width: VectorApp.width,
        height: VectorApp.height,
    });
}