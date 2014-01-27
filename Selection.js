function Selection()
{
    this.selected = [];
}

Selection.prototype.select = function(item, event)
{
    if(event.ctrlKey)
    {
        console.log("ctrl")
        this.toggle(item);
    }
    else
    {
        if(event.shiftKey)
        {
        console.log("shift")
            this.add(item);
        }
        else
        {
            this.replace(item);
        }
    }
};

Selection.prototype.has = function(item)
{
    return this.selected.indexOf(item) != -1;
};

Selection.prototype.toggle = function(item)
{
    if(this.has(item))
    {
        this.remove(item);
    }
    else
    {
        this.add(item);
    }
};

Selection.prototype.add = function(item)
{
    console.log("add", this.has(item))
    if(!this.has(item))
    {
        this.selected.push(item);
        item.setSelected();
    }
};

Selection.prototype.replace = function(item)
{
    this.clear();
    this.selected = [item];
    item.setSelected();
};

Selection.prototype.clear = function()
{
    for(var s in this.selected)
    {
        this.selected[s].setNotSelected();
    }
    this.selected = [];
};

Selection.prototype.remove = function(item)
{
    if(this.has(item))
    {
        this.selected.splice(this.selected.indexOf(item), 1);
        item.setNotSelected();
    }
};