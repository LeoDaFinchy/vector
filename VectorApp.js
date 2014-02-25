var Stroke = Stroke || {};

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
            .on('contextmenu', VectorApp.toolContextMenu)
            .on('click', VectorApp.toolClick)
            ;
        VectorApp.stage.on('mousedown', VectorApp.toolMouseDown);
        VectorApp.stage.on('mousemove', VectorApp.toolMouseMove);
        VectorApp.stage.on('dragstart', VectorApp.toolDragStart);
        VectorApp.stage.on('dragend', VectorApp.toolDragEnd);
        
        VectorApp.stage.setDraggable(true);
        VectorApp.stage.dragBoundFunc(function(){return{x:this.getAbsolutePosition().x, y:this.getAbsolutePosition().y}});
        
        window.setTimeout(draw, 1000/30);
    },
    mouseout: function(thing)
    {
        if(thing == VectorApp.hovered)
        {
            VectorApp.hovered = null;
            thing.setNotHovered();
        }
    },
    mouseover: function(thing)
    {   
        if(VectorApp.hovered)
        {
            VectorApp.hovered.setNotHovered();
        }
        VectorApp.hovered = thing;
        thing.setHovered();
    },
    addTool: function(tool)
    {
        $('#toolbox').append('<div class="button" id="' + tool.id + '">' + tool.label + '</div>');
        VectorApp.tools[tool.id] = tool;
        $('#' + tool.id).click({tool: tool}, VectorApp.activateTool);
    },
    activateTool: function(event)
    {
        VectorApp.activeTool = event.data.tool;
        if(VectorApp.activeTool && VectorApp.activeTool.activate)
        {
            VectorApp.activeTool.activate(event);
        }
    },
    toolClick: function(event)
    {
        if(VectorApp.activeTool && VectorApp.activeTool.click)
        {
            VectorApp.activeTool.click(event);
        }
    },
    toolMouseDown: function(event)
    {
        if(VectorApp.activeTool && VectorApp.activeTool.mouseDown)
        {
            VectorApp.activeTool.mouseDown(event);
        }
    },
    toolMouseMove: function(event)
    {
        if(VectorApp.activeTool && VectorApp.activeTool.mouseMove)
        {
            VectorApp.activeTool.mouseMove(event);
        }
    },
    toolContextMenu: function(event)
    {
        if(VectorApp.activeTool && VectorApp.activeTool.mouseMove)
        {
            VectorApp.activeTool.contextMenu(event);
        }
        
        event.preventDefault();
        return false;
    },
    toolDragStart: function(event)
    {
        if(VectorApp.activeTool && VectorApp.activeTool.dragStart)
        {
            VectorApp.activeTool.dragStart(event);
        }
    },
    toolDragEnd: function(event)
    {
        if(VectorApp.activeTool && VectorApp.activeTool.dragEnd)
        {
            VectorApp.activeTool.dragEnd(event);
        }
    },
};

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
VectorApp.addStroke = function()
{
    if(VectorApp.selected.selected.length > 1)
    {
        var stroke = new Stroke(VectorApp.selected.selected);
        VectorApp.layers.Base.add(stroke);
    }
};
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

