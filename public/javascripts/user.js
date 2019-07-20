app.controller('siteCtrl', function ($scope, $http, dataService) {
    $scope.Do = "find";
    $scope.search_info = "";
    var li = document.getElementById('nav').getElementsByTagName('li');
    li[5].className = 'am-active';
    $scope.show = true;
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
                $scope.ID = res.ID;
                $scope.Login_user = res.Login_user;
                $scope.Login_password = res.Login_password;
                $scope.Login_name = $scope.Login_name1 = res.Login_name;
                $scope.Login_ico = $scope.Login_ico1 = res.Login_ico;
                $scope.Login_level = res.Login_level;
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
                    "Login_name": $scope.Login_name1 ? $scope.Login_name1 : "",
                    "Login_level": $scope.admin,
                    "Login_ico": $scope.Login_ico1 ? $scope.Login_ico1 : "123.jpeg"
                }
            },
            "cb": function (res) {
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
                        "Login_name": $scope.Login_name1 ? $scope.Login_name1 : "",
                    }
                },
                "cb": function (res) {}
            };
            $scope.get_data($scope.get_data_json_1);
            $scope.Upload();
        }
        $scope.Get_data_json();
        if ($scope.Login_user && $scope.Login_password && $scope.Login_name) {
            $scope.get_data($scope.get_data_json);
        }
        $scope.Do = 'find';
        $scope.Get_data_json();
        setTimeout(function () {
            $scope.get_data($scope.get_data_json);
            $scope.get_data($scope.get_personal_json);
        }, 500);
    };
    $scope.edit_or_lookup = function (i) {
        if (i.Login_level == '0') {
            $(":radio[value=0]").uCheck('check');
        }else {
            $(":radio[value=1]").uCheck('check');
        }
        $scope.Do = 'change';
        $scope.ID = i.ID;
        $scope.Login_user = i.Login_user;
        $scope.Login_password = i.Login_password;
        $scope.Login_name1 = i.Login_name;
        $scope.Login_ico1 = i.Login_ico;
        $scope.Login_level = i.Login_level;   
    };
    /********/
    $scope.clear_info = function () {
        $(":radio[value=1]").uCheck('uncheck');
        $(":radio[value=0]").uCheck('uncheck');
        $scope.Do = 'add';
        $scope.ID = '';
        $scope.Login_user = '';
        $scope.Login_password = '';
        $scope.Login_name1 = '';
        $scope.Login_ico1 = '123.jpeg';
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