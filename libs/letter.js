module.exports = function(name){
return `
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
</head>

<body>
    <div">
        <p>Greetings <span style="color: red">${name}</span>!</p>
        <p>We're pleased to welcome you to our Chat!</p>
        <p><a href=" http://ae6b1e85.ngrok.io/">Start page</a></p>
        </div>
</body>

</html>`
};