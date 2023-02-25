module.exports.home = function(req, res)
{
    // console.log(req.cookies);
    // res.cookie('psm', 369);
    return res.render('home',{title: "Home"});
}