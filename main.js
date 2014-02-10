var Kinetic = Kinetic || {};
var Nodule = Nodule || {};
var Stroke = Stroke || {};
var Selection = Selection || {};
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
    strokes:[],
    tools:{},
    activeTool:null,
    selected:null,
    hovered:null,
    setListeners: function()
    {
        $(".kineticjs-content")
            .on("mousewheel", onMouseWheel)
            .on("DOMMouseScroll", onDOMMouseScroll)
            ;
        VectorApp.stage.on('click', this.toolClick);
        
        window.setTimeout(draw, 1000/30);
    },
    mouseout: function(thing)
    {
        if(thing == this.hovered)
        {
            this.hovered = null;
            thing.setNotHovered();
        }
    },
    mouseover: function(thing)
    {   
        if(this.hovered)
        {
            this.hovered.setNotHovered();
        }
        this.hovered = thing;
        thing.setHovered();
    },
    addTool: function(tool)
    {
        $('#toolbox').append('<div class="button" id="' + tool.id + '">' + tool.label + '</div>');
        this.tools[tool.id] = tool;
        $('#' + tool.id).click({tool: tool}, this.activateTool);
    },
    activateTool: function(event)
    {
        VectorApp.activeTool = event.data.tool;
    },
    toolClick: function(event)
    {
        if(VectorApp.activeTool)
        {
            VectorApp.activeTool.click(event);
        }
    },
};

function DocReady(event)
{
    $.getScript("tools/NodeSpawner.js");
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
    if(VectorApp.hovered)
    {
        var rad = VectorApp.hovered.getRadius();
        VectorApp.hovered.modRadius(rad + delta);
    }
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
VectorApp.addStroke = function()
{
    if(VectorApp.selected.selected.length > 1)
    {
        var stroke = new Stroke(VectorApp.selected.selected);
        VectorApp.layers.Base.add(stroke);
    }
}