var VectorApp = VectorApp || {};
var Nodule = Nodule || {};
var Stroke = Stroke || {};
var StrokeSegment = StrokeSegment || {};
var StrokeNode = StrokeNode || {};

var Pen = {
    label: "Pen",
    id: "pen",
    stroke: null,
    nextNodule: null,
    click: function(event)
    {
        if(event.button === 0)//LEFT
        {
            if(Pen.stroke === null)
            {
                console.log("newStroke");
                Pen.nextNodule = Pen.addNoduleAtPointer();
                Pen.stroke = new Stroke([Pen.nextNodule]);
                Pen.nextNodule = Pen.addNoduleAtPointer();
                Pen.stroke.addToEnd(Pen.nextNodule);
                //new StrokeSegment(Pen.stroke, Pen.stroke.firstNode, new StrokeNode(Pen.nextNodule));
                Pen.nextNodule.startDrag();
                
                VectorApp.layers.Base.add(Pen.stroke);
            }
            else
            {
                console.log("continueStroke");
                Pen.nextNodule.stopDrag();
                Pen.nextNodule = Pen.addNoduleAtPointer();
                Pen.stroke.addToEnd(Pen.nextNodule);
                //new StrokeSegment(Pen.stroke, Pen.stroke.lastNode, new StrokeNode(Pen.nextNodule));
                Pen.nextNodule.startDrag();
            }
            //console.log(this.stroke);
        }
        //addNoduleAtPointer();
    },
    mouseDown: function(event)
    {
        //alert("down");
    },
    mouseMove: function(event)
    {
        //alert("move");
    },
    contextMenu: function(event)
    {
        if(Pen.nextNodule)
        {
            Pen.stroke.lastNode.prev.prev.next = null;
            Pen.stroke.lastNode.prev = null;
            Pen.stroke.update();
            
            Pen.nextNodule.stopDrag();
            Pen.removeNodule(Pen.nextNodule);
            Pen.nextNodule = null;
            Pen.stroke = null;
        }
    }
};

VectorApp.addTool(Pen);

Pen.addNoduleAtPointer = function()
{
    var nod = new Nodule(event.pageX - VectorApp.left, event.pageY - VectorApp.top);
    VectorApp.frontLayer.add(nod);
    VectorApp.nodules.push(nod);
    return nod;
};

Pen.removeNodule = function(nod)
{
    VectorApp.nodules = VectorApp.nodules.splice(VectorApp.nodules.indexOf(nod), 1);
    nod.remove();
    return nod;
};
