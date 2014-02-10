var VectorApp = VectorApp || {};
var Nodule = Nodule || {};

var NodeSpawner = {
    label: "Node Spawner",
    id: "nodeSpawner",
    click: function(event)
    {
        addNoduleAtPointer();
    },
};

VectorApp.addTool(NodeSpawner);

function addNoduleAtPointer()
{
    var nod = new Nodule(event.pageX - VectorApp.left, event.pageY - VectorApp.top);
    VectorApp.frontLayer.add(nod);
    VectorApp.nodules.push(nod);
}
