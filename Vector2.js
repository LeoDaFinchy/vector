function Vector2(x, y)
{
    this.x = x || 0;
    this.y = y || 0;
    this.clone = function()
    {
        return new Vector2(this.x, this.y);
    };
    this.add = function(v)
    {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    this.subtract = function(v)
    {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
}