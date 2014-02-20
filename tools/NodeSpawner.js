var VectorApp = VectorApp || {};
var Nodule = Nodule || {};

var NodeSpawner = {
    label: "Node Spawner",
    id: "nodeSpawner",
    click: function(event)
    {
        NodeSpawner.addNoduleAtPointer();
    },
};

VectorApp.addTool(NodeSpawner);

NodeSpawner.addNoduleAtPointer = function()
{
    var nod = new Nodule(event.pageX - VectorApp.left, event.pageY - VectorApp.top);
    VectorApp.frontLayer.add(nod);
    VectorApp.nodules.push(nod);
}
