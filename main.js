var Kinetic = Kinetic || {};
var Nodule = Nodule || {};
var $ = $ || {};

$('document').ready(DocReady);


var VectorApp = {
    width:0,
    height:0,
    left:0,
    top:0,
    stage:null,
    layers:{},
    frontLayer:null,
    backLayer:null,
    nodules:[],
    selected:[],
    setListeners: function()
    {
        $(".kineticjs-content")
            .on("mousewheel", onMouseWheel)
            .on("DOMMouseScroll", onDOMMouseScroll)
            ;
        VectorApp.stage.on('click', onStageClick);
        
        window.setTimeout(draw, 1000/30);
    },
    noduleClicked: function(nodule, event)
    {
        if(event.ctrlKey)
        {
            this.toggleSelectNodule(nodule);
        }
        else
        {
            if(event.shiftKey)
            {
                this.selectNoduleInclusively(nodule);
            }
            else
            {
                this.selectNoduleExclusively(nodule);
            }
        }
    },
    toggleSelectNodule: function(nodule)
    {
        var i = this.selected.indexOf(nodule);
        if(i === -1)
        {
            this.selectNoduleInclusively(nodule);
        }
        else
        {
            this.deselectNodule(nodule);
        }
    },
    selectNoduleInclusively: function(nodule)
    {
        var i = this.selected.indexOf(nodule);
        if(i === -1)
        {
            this.selected.push(nodule);
            nodule.setSelected();
        }
    },
    selectNoduleExclusively: function(nodule)
    {
        this.deselectAllNodules();
        this.selected = [nodule];
        nodule.setSelected();
    },
    deselectAllNodules: function(nodule)
    {
        for(var s in this.selected)
        {
            this.selected[s].setNotSelected();
        }
        this.selected = [];
    },
    deselectNodule: function(nodule)
    {
        var i = this.selected.indexOf(nodule);
        if(i >= 0)
        {
            this.nodules.splice(i, 1);
            nodule.setNotSelected();
        }
    }
};

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
    
    VectorApp.setListeners();
}

function draw()
{
    VectorApp.backLayer.draw();
    for(var l in VectorApp.layers)
    {
        VectorApp.layers[l].draw();
    }
    VectorApp.frontLayer.draw();
    
    window.setTimeout(draw, 1000/30);
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
function onStageClick(event)
{
    addNoduleAtPointer();
}
function addNoduleAtPointer()
{
    var nod = new Nodule(event.pageX - VectorApp.left, event.pageY - VectorApp.top);
    VectorApp.frontLayer.add(nod);
    VectorApp.nodules.push(nod);
}