var VectorApp = VectorApp || {};

var NodeSpawner = {
    label: "Node Spawner",
    id: "nodeSpawner",
    click: function(event)
    {
        alert("NodeSpawner click!");
    },
};

VectorApp.addTool(NodeSpawner);