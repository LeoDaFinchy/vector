var MathUtil = {};

MathUtil.factorial = function(n)
{
    var f = 1;
    for(var i = 2; i <= n; i++)
    {
        f *= i;
    }
    return f;
};
MathUtil.binomialCoefficient = function(n, k)
{
    return MathUtil.factorial(n) / (MathUtil.factorial(k) * MathUtil.factorial(n - k));
};