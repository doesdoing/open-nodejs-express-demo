var app = angular.module('myApp', []);
app.factory('dataService', function ($http) {
    var service = {
        Range: function (n) {
            var arr = [];
            for (var i = 0; i < n; i++) {
                arr.push(i);
            }
            return arr;
        },
        Ajax: function (e) {
            var b = new Base64();
            var base64_data = b.encode(encodeURI(JSON.stringify(e.data)));
            var URL = e.url + '?callback=JSON_CALLBACK&&data=' + base64_data;
            $http.jsonp(URL).success(function (res) {
                e.cb(res);
            });
        },
        Upload: function (cb) {
            var formdata = new FormData();
            var img = $('#upload_file')[0].files[0];
            if (img) {
                formdata.append("file", img);
                $.ajax({
                    type: "POST",
                    url: '/api',
                    data: formdata,
                    async: true,
                    contentType: false, // 不设置内容类型
                    processData: false, // 不处理数据
                    success: function (data) {
                        //console.log(data);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
        }
    };
    return service;
});