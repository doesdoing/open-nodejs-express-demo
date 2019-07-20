app.controller('siteCtrl', function ($scope, $http,dataService) {
    $scope.Do='find';
    $scope.get_personal_json = {
        "url": "/api",
        "data": {
            "Do": 'personal',
            "DB": "user",
            "start": "",
            "end": ""
        },
        "cb": function (res) {
            $scope.ID = res.ID;
            $scope.Login_user = res.Login_user;
            $scope.Login_password = res.Login_password;
            $scope.Login_name = res.Login_name;
            $scope.Login_ico = res.Login_ico;
            $scope.Login_level = res.Login_level;
            if ($scope.Login_level =='0') {
                $scope.show=true;
            }else{
                $scope.show=false;
            }
        }
    };
    $scope.get_data = dataService.Ajax;

    var li = document.getElementById('nav').getElementsByTagName('li');
    li[0].className = 'am-active';
    $scope.Upload = dataService.Upload;
    $scope.Refresh_Data = function (e) {
        if (e) {
            $scope.get_data_json_1 = {
                "url": "/api",
                "data": {
                    "Do": "change",
                    "DB": "user",
                    "ID": "",
                    "start": "",
                    "end": "",
                    "Data": {
                        "ID": $scope.ID ? $scope.ID : "",
                        "Login_user": $scope.Login_user ? $scope.Login_user : "",
                        "Login_password": $scope.Login_password ? $scope.Login_password : "",
                        "Login_name": $scope.Login_name ? $scope.Login_name : "",
                    }
                },
                "cb": function (res) {
                    console.log(res);
                }
            }; 
            $scope.get_data($scope.get_data_json_1);
            $scope.Upload ();
        }
        setTimeout(function(){
            $scope.get_data($scope.get_personal_json);
        }, 500);
    };
    $scope.Refresh_Data();
});