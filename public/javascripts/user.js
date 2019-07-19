app.controller('siteCtrl', function ($scope, $http, dataService) {
    $scope.Do = "find";
    $scope.search_info = "";
    var li = document.getElementById('nav').getElementsByTagName('li');
    li[5].className = 'am-active';
    $scope.show=true;
    $scope.get_data = dataService.Ajax;
    /********/
    $scope.temp_arr = [];
    $scope.select_id = function (i) {
        $scope._tr = document.getElementsByTagName("tr");
        $scope.tmp_input = angular.element($scope._tr).eq(i + 1).find("td").eq(1).find("input").eq(0).attr("checked");
        $scope.tmp = angular.element($scope._tr).eq(i + 1).eq(0).find("td").eq(0).html();
        if ($scope.tmp_input == "checked") {
            angular.element($scope._tr).eq(i + 1).find("td").eq(1).find("input").eq(0).removeAttr("checked", "");
            $scope.temp_arr.splice($.inArray($scope.tmp, $scope.temp_arr), 1);
        }
        if ($scope.tmp_input == undefined) {
            angular.element($scope._tr).eq(i + 1).find("td").eq(1).find("input").eq(0).attr("checked", "true");
            $scope.temp_arr.push($scope.tmp);
        }
    };

    /********/
    $scope.Get_data_json = function () {
        $scope.get_personal_json = {
            "url": "/api",
            "data": {
                "Do": "personal",
                "DB": "user",
                "start": "",
                "end": ""
            }, "cb": function (res) {
                console.log(res);
                $scope.ID = res.ID;
                $scope.Login_user = res.Login_user;
                $scope.Login_password = res.Login_password;
                $scope.Login_name = res.Login_name;
                $scope.Login_ico = res.Login_ico;
                if ($scope.Login_level == '0') {
                    $scope.admin = $('#power').find('input').eq(0).attr('checked', 'checked');
                } else {
                    $scope.user = $('#power').find('input').eq(1).attr('checked', 'checked');
                }
            }
        };
        $scope.admin = $(":radio:checked").val();
        $scope.get_data_json = {
            "url": "/api",
            "data": {
                "Do": $scope.Do,
                "DB": "user",
                "ID": $scope.temp_arr,
                "start": 0,
                "end": 1000,
                "keyword": $scope.search_info,
                "Data": {
                    "ID": $scope.ID ? $scope.ID : "",
                    "Login_user": $scope.Login_user ? $scope.Login_user : "",
                    "Login_password": $scope.Login_password ? $scope.Login_password : "",
                    "Login_name": $scope.Login_name ? $scope.Login_name : "",
                    "Login_level": $scope.admin,
                    "Login_ico": $scope.Login_ico ? $scope.Login_ico : ""
                }
            },
            "cb": function (res) {
                console.log(res);
                $scope.data = res.data;
            }
        };

    };
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
                }
            }; 
            $scope.get_data($scope.get_data_json_1);
            $scope.Upload();
        }
        $scope.Get_data_json();    
        $scope.get_data($scope.get_data_json);
        $scope.Do = 'find';
        $scope.Get_data_json();    
        setTimeout(function(){
            $scope.get_data($scope.get_data_json);
            $scope.get_data($scope.get_personal_json);
        }, 1000);
    };
    $scope.edit_or_lookup = function (i) {
        $scope.Do = 'change';
        $scope.ID = i.ID;
        $scope.Login_user = i.Login_user;
        $scope.Login_password = i.Login_password;
        $scope.Login_name = i.Login_name;
        $scope.Login_ico = i.Login_ico;
    };
    /********/
    $scope.clear_info = function () {
        $(":radio").removeAttr('checked');
        $scope.Do = 'add';
        $scope.ID = '';
        $scope.Login_user = '';
        $scope.Login_password = '';
        $scope.Login_name = '';
        $scope.Login_ico = '123.jpeg';
    };
    /********/

    $scope.Refresh_Data();
    /********/
    $scope.del_data = function () {
        $scope.Do = 'delete';
    };
    /********/
    $scope.search_input = function (e) {
        $scope.Get_data_json();
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.get_data($scope.get_data_json);
        }
    };
    /********/


});