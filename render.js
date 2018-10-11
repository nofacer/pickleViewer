const request = require('request');

function PostCode(fp) {

    request({
        method: 'POST',
        url: 'http://127.0.0.1:5000/load',
        // body: '{"foo": "bar"}'
        json: {"fp": fp}
    }, (error, response, body) => {
        console.log(error);
        console.log(response);
        console.log(body);
        // r=response.data;
        document.getElementById('content').innerHTML = JSON.stringify(body['content']);
    });


}


document.addEventListener('drop', function (e) {
    let f;
    e.preventDefault();
    e.stopPropagation();
    f = e.dataTransfer.files[0];
    PostCode(f.path.replace(/\\/g,"/"));

    console.log('File you dragged here: ', f.path)

});
document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
});


