var VectorApp = VectorApp || {};
var Nodule = Nodule || {};
var Stroke = Stroke || {};
var StrokeSegment = StrokeSegment || {};

var Pen = {
    label: "Pen",
    id: "pen",
    stroke: null,
    nextNode: null,
    click: function(event)
    {
        if(event.button === 0)//LEFT
        {
            if(Pen.stroke === null)
            {
                console.log("newStroke");
                Pen.nextNode = Pen.addNoduleAtPointer();
                Pen.stroke = new Stroke([Pen.nextNode]);
                VectorApp.layers.Base.add(Pen.stroke);
                Pen.nextNode = Pen.addNoduleAtPointer();
                Pen.stroke.addToEnd(Pen.nextNode, StrokeSegment.prototype.typeEnum.LINE);
                Pen.nextNode.startDrag();
            }
            else
            {
                console.log("continueStroke");
                Pen.nextNode.stopDrag();
                Pen.nextNode = Pen.addNoduleAtPointer();
                Pen.stroke.addToEnd(Pen.nextNode, StrokeSegment.prototype.typeEnum.LINE);
                Pen.nextNode.startDrag();
            }
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
        if(Pen.nextNode)
        {
            Pen.stroke.takeFromEnd();
            Pen.stroke.update();
            Pen.nextNode.stopDrag();
            Pen.removeNodule(Pen.nextNode);
            Pen.nextNode = null;
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
