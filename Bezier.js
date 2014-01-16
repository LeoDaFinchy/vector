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
Bezier.quadraticInterpolate = function(a, b, c, t)
{
    var results = [];
    for(var i in t){
        var tp = t[i];
        var tn = 1 - tp;
        
        var r0 = Math.pow(tn, 2) * a;
        var r1 = 2 * tn * tp * b;
        var r2 = Math.pow(tp, 2) * c;
        
        results.push(r0 + r1 + r2);
    }
    return results;
};