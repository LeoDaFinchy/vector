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
    this.length = function()
    {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    this.normalise = function()
    {
        var len = this.length();
        this.x /= len;
        this.y /= len;
        return this;
    };
    this.scale = function(s)
    {
        this.x *= s;
        this.y *= s;
        return this;
    };
    this.normal = function()
    {
        return new Vector2(this.y, -this.x).normalise();
    };
    this.angle = function()
    {
        return Math.atan2(this.y, this.x);
    };
}

Vector2.displacement = function(a, b)
{
    return b.clone().subtract(a);
};

Vector2.distance = function(a, b)
{
    return Vector2.displacement(a, b).length();
};
