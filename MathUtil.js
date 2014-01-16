var MathUtil = {};

MathUtil.factorial = function(n)
{
    var f = n;
    for(var i = 2; i < n; i++)
    {
        f *= i;
    }
    return f;
};