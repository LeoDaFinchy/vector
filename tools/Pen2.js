var VectorApp = VectorApp || {};
var Nodule = Nodule || {};
var Stroke = Stroke || {};
var StrokeSegment = StrokeSegment || {};
var StrokeNode = StrokeNode || {};
var Vector2 = Vector2 || {};

var Pen = {
    label: "Pen2",
    id: "pen",
    stroke: null,
    nextNodule: null,
    anchor: null,
    state: null,
    click: function(event)
    {
        console.log("click");
        if(event.button === 0)//LEFT
        {
            if(Pen.state == Pen.stateEnum.NOTHING)
            {
                Pen.startStroke();
                VectorApp.layers.Base.add(Pen.stroke);
                
                Pen.state = Pen.stateEnum.DONEACORNER;
                console.log("DONEACORNER");
            }
            else if(Pen.state == Pen.stateEnum.DONEACORNER)
            {
                Pen.nextNodule = Pen.addNoduleAtPointer();
                Pen.stroke.addToEnd(Pen.nextNodule);
                
                Pen.state = Pen.stateEnum.DONEACORNER;
                console.log("DONEACORNER");
            }
            else if(Pen.state == Pen.stateEnum.DOINGACURVE)
            {
                //Pen.detachNoduleFromPointer(Pen.nextNodule);
                Pen.nextNodule.stopDrag();
                //Pen.nextNodule = Pen.addNoduleAtPointer();
                //Pen.stroke.addToEnd(Pen.nextNodule);
                //Pen.attachNoduleToPointer(Pen.nextNodule);
                
                Pen.state = Pen.stateEnum.DONEACURVE;
                console.log("DONEACURVE");
            }
            else if(Pen.state == Pen.stateEnum.DONEACURVE)
            {
                /*if(Pen.stroke.lastNode.prev.type == StrokeSegment.prototype.typeEnum.LINE)
                {
                    Pen.stroke.lastNode.prev.convertLineToCurve();
                    VectorApp.frontLayer.add(Pen.stroke.lastNode.prev.anchors[0].nodule);
                    VectorApp.nodules.push(Pen.stroke.lastNode.prev.anchors[0].nodule);
                    VectorApp.frontLayer.add(Pen.stroke.lastNode.prev.anchors[1].nodule);
                    VectorApp.nodules.push(Pen.stroke.lastNode.prev.anchors[1].nodule);
                }*/
                Pen.nextNodule = Pen.addNoduleAtPointer();
                Pen.stroke.addToEnd(Pen.nextNodule);
                
                Pen.state = Pen.stateEnum.DONEACORNER;
                console.log("DONEACORNER");
            }
        }
    },
    dragStart: function(event)
    {
        console.log("dragStart");
        if(event.button === 0)//LEFT
        {
            if(Pen.state == Pen.stateEnum.NOTHING)
            {
                Pen.startStroke();
                VectorApp.layers.Base.add(Pen.stroke);
                Pen.nextNodule = Pen.addNoduleAtPointer();
                Pen.nextNodule.startDrag();
                
                Pen.state = Pen.stateEnum.DOINGACURVE;
                console.log("DOINGACURVE");
            }
            else if(Pen.state == Pen.stateEnum.DONEACURVE)
            {
                Pen.anchor = new StrokeNode(Pen.stroke, Pen.nextNodule);
                Pen.nextNodule = Pen.addNoduleAtPointer();
                Pen.stroke.addToEnd(Pen.nextNodule);
                if(Pen.stroke.lastNode.prev.type == StrokeSegment.prototype.typeEnum.LINE)
                {
                    Pen.stroke.lastNode.prev.convertLineToCurve(Pen.anchor);
                    VectorApp.frontLayer.add(Pen.stroke.lastNode.prev.anchors[1].nodule);
                    VectorApp.nodules.push(Pen.stroke.lastNode.prev.anchors[1].nodule);
                }
                Pen.anchor = Pen.stroke.lastNode.prev.anchors[1];
                
                Pen.nextNodule = Pen.addNoduleAtPointer();
                Pen.nextNodule.startDrag();
                
                Pen.state = Pen.stateEnum.DOINGACURVE;
                console.log("DOINGACURVE");
            }
        }
    },
    dragEnd: function(event)
    {
        console.log("dragEnd");
        /*if(event.button === 0)//LEFT
        {
            if(Pen.state == Pen.stateEnum.DOINGACURVEANCHOR)
            {
                Pen.attachNoduleToPointer(Pen.nextNodule);
                var sNode = Pen.nextNodule.strokeNodes[Pen.nextNodule.strokeNodes.length - 1];
                sNode.prev.type = StrokeSegment.prototype.typeEnum.CURVE;
                sNode.prev.anchors = [new StrokeNode(Pen.stroke, Pen.addNoduleAtPointer()), new StrokeNode(Pen.stroke, Pen.addNoduleAtPointer())];
                
                Pen.state = Pen.stateEnum.DONEACURVEANCHOR;
                console.log("DONEACURVEANCHOR");
            }
        }
        else if(event.button === 2)//RIGHT
        {
            if(Pen.nextNodule)
            {
                Pen.stroke.lastNode.prev.prev.next = null;
                Pen.stroke.lastNode.prev = null;
                Pen.stroke.lastNode.nodule.listening(true);
                Pen.stroke.update();
                
                Pen.detachNoduleFromPointer(Pen.nextNodule);
                Pen.removeNodule(Pen.nextNodule);
                Pen.nextNodule = null;
                Pen.stroke = null;
            }
            Pen.state = Pen.stateEnum.NOTHING;
            console.log("NOTHING");
        }*/
    },
    dragMove: function(event)
    {
        //console.log("dragMove");
        if(Pen.state == Pen.stateEnum.DOINGACURVE)
        {
            if(Pen.anchor !== null)
            {
                Pen.anchor.nodule.setPosition(Vector2.displacement(Pen.stroke.lastNode.nodule.getPosition(), Pen.nextNodule.getPosition()).scale(-1).add(Pen.stroke.lastNode.nodule.getPosition()));
                Pen.stroke.update();
            }
        }
    },
   mouseDown: function(event)
    {
        console.log("mouseDown");
        /*if(event.button === 0)//LEFT
        {
            if(Pen.state == Pen.stateEnum.DOINGACURVE)
            {
                Pen.detachNoduleFromPointer(Pen.nextNodule);
                Pen.state = Pen.stateEnum.DONEACURVE;
            }
        }*/
    },
    contextMenu: function(event)
    {
        console.log("contextMenu");
        if(Pen.nextNodule)
        {
            //Pen.stroke.lastNode.prev.prev.next = null;
            //Pen.stroke.lastNode.prev = null;
            //Pen.stroke.lastNode.node.listening(true);
            Pen.stroke.update();
            
            /*Pen.detachNoduleFromPointer(Pen.nextNodule);
            Pen.removeNodule(Pen.nextNodule);*/
            Pen.nextNodule = null;
            Pen.stroke = null;
        }
        Pen.state = Pen.stateEnum.NOTHING;
        console.log("NOTHING");
    },
    activate: function(event)
    {
        Pen.state = Pen.stateEnum.NOTHING;
        console.log("NOTHING");
    }
};

VectorApp.addTool(Pen);
/*
Pen.attachNoduleToPointer = function(nodule)
{
    nodule.startDrag();
    nodule.listening(false);
};

Pen.detachNoduleFromPointer = function(nodule)
{
    nodule.stopDrag();
    nodule.listening(true);
};
*/
Pen.startStroke = function()
{
    Pen.nextNodule = Pen.addNoduleAtPointer();
    Pen.stroke = new Stroke([Pen.nextNodule]);
    //Pen.nextNodule = Pen.addNoduleAtPointer();
   // Pen.stroke.addToEnd(Pen.nextNodule);
   // Pen.attachNoduleToPointer(Pen.nextNodule);
};

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

Pen.stateEnum = {
    NOTHING: 1,
    DONEACORNER: 2,
    DOINGACURVEANCHOR: 3,
    DONEACURVEANCHOR: 4,
    DOINGACURVE: 5,
    DONEACURVE: 6,
};
