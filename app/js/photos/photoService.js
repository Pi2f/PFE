myApp.factory('photoService', ['$http', 'Upload', 'sessionService', function ($http, Upload, sessionService) {
    var serv = {};


    serv.UploadPhoto = function (file) {
        return Upload.upload({
            url: '/api/photo',
            method: 'POST',
            data: {
                file: file,
                id: sessionService.user.id
            }
        });
    }

    /**
     * This function could be used to send the image data
     * to a backend server that expects base64 encoded images.
     *
     * In this example, we simply store it in the scope for display.
     */

    serv.sendSnapshotToServer = function sendSnapshotToServer(imgBase64, cb) {
        // Split the base64 string in data and contentType
        var block = imgBase64.split(";");
        // Get the content type of the image
        var contentType = block[0].split(":")[1]; // In this case "image/gif"
        // get the real base64 content of the file
        var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

        // Convert it to a blob to upload
        var blob = b64toBlob(realData, contentType);

        // Create a FormData and append the file with "image" as parameter name
        var formDataToUpload = new FormData();
        formDataToUpload.append("file", blob);
        formDataToUpload.append("id", sessionService.user.id);

        $.ajax({
            url:"/api/photo",
            data: formDataToUpload,// Add as Data the Previously create formData
            type:"POST",
            contentType:false,
            processData:false,
            cache:false,
            dataType:"json", // Change this according to your response from the server.
            error:function(err){
                console.error(err);
            },
            success: cb,
        });
    };

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {
            type: contentType
        });
        return blob;
    }

    serv.GetPhotos = function () {
        return $http.get('/api/photo/' + sessionService.user.id).
        then(function (response) {
            var imgB64 = [];
            response.data.forEach(document => {
                imgB64.push(arrayBufferToBase64(document.img.data.data));
            });
            return imgB64;
        });
    }

    arrayBufferToBase64 = function (buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    };

    return serv;
}])