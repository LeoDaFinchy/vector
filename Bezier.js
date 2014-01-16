var Bezier = {};

Bezier.linearInterpolate = function(a, b, t)
{
    var results = [];
    for(var i in t){
        var tp = t[i];
        var tn = 1 - tp;
        
        var r0 = tn * a;
        var r1 = tp * b;
        
        results.push(r0 + r1);
    }
    return results;
};