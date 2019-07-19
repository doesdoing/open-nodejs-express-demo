/*var app = angular.module('myApp', []);*/
app.controller('siteCtrl', function ($scope, $http, dataService) {
    $scope.search_info = '';
    $scope.start = 0;
    $scope.end = 10;
    $scope.focus = 0;
    $scope.page_index = 0;
    $scope.Do = 'find';
    var li = document.getElementById('nav').getElementsByTagName('li');
    li[2].className = 'am-active';
    $scope.range = dataService.Range;
    $scope.get_data = dataService.Ajax;
    $scope.Get_data_json = function () {
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
                if ($scope.Login_level == '0') {
                    $scope.admin = $('#power').find('input').eq(0).attr('checked', 'checked');
                    $scope.show = true;
                } else {
                    $scope.user = $('#power').find('input').eq(1).attr('checked', 'checked');
                    $scope.show = false;
                }
            }
        };
        $scope.get_data_json = {
            "url": "/api",
            "data": {
                "Do": $scope.Do,
                "DB": "network",
                "ID": $scope.temp_arr,
                "start": $scope.start,
                "end": $scope.end,
                "keyword": $scope.search_info,
                "Data": {
                    "ID": $scope.ID ? $scope.ID : "",
                    "Network_model": $scope.Network_model ? $scope.Network_model : "",
                    "Network_user": $scope.Network_user ? $scope.Network_user : "",
                    "Network_password": $scope.Network_password ? $scope.Network_password : "",
                    "Network_ip": $scope.Network_ip ? $scope.Network_ip : "",
                    "Network_remark": $scope.Web_pNetwork_remarkassword ? $scope.Network_remark : "",
                    "Network_location": $scope.Network_location ? $scope.Network_location : ""
                }
            },
            "cb": function (res) {
                $scope.data = res.data;
                $scope.len = res.len;
                $scope.total_page = (res.len % 10) == 0 ? parseInt(res.len / 10) : parseInt(res.len / 10) + 1;
                $scope.page = $scope.range($scope.total_page);
            }
        };
    };
    /********/
    $scope.edit_or_lookup = function (i) {
        $scope.Do = 'change';
        $scope.ID = i.ID;
        $scope.Network_model = i.Network_model;
        $scope.Network_user = i.Network_user;
        $scope.Network_password = i.Network_password;
        $scope.Network_ip = i.Network_ip;
        $scope.Network_remark = i.Network_remark;
        $scope.Network_location = i.Network_location;
    };
    /********/
    $scope.clear_info = function () {
        $scope.Do = 'add';
        $scope.ID = '';
        $scope.Network_model = '';
        $scope.Network_user = '';
        $scope.Network_password = '';
        $scope.Network_ip = '';
        $scope.Network_remark = '';
        $scope.Network_location = '';
    };
    /********/
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
        setTimeout(function () {
            $scope.get_data($scope.get_data_json);
            $scope.get_data($scope.get_personal_json);
        }, 1000);
    };
    $scope.Refresh_Data();
    /********/
    $scope.del_data = function () {
        $scope.Do = 'delete';
    };
    /********/
    $scope.search_input = function (e) {
        $scope.start = 0;
        $scope.end = 10;
        $scope.Get_data_json();
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.get_data($scope.get_data_json);
            $scope.focus = 0;
        }
    };
    /********/
    $scope.next_btn = function () {
        if ($scope.end < $scope.len) {
            $scope.focus++;
            if ($scope.focus > 9) {
                $scope.focus = 0;
                $scope.page_index = $scope.page_index + 10;
            }
            $scope.start = $scope.start + 10;
            $scope.end = $scope.end + 10;
            $scope.clear_info();
            $scope.Refresh_Data();
        }
    };
    $scope.index_page_btn = function (i) {
        if (i > 9) {
            $scope.focus = 0;
            $scope.start = $scope.start + 10;
            $scope.end = $scope.end + 10;
        }
        if (i < 10 && i > -1) {
            $scope.focus = i;
            $scope.start = ($scope.page_index + i) * 10;
            $scope.end = ($scope.page_index + i + 1) * 10;
        }
        $scope.clear_info();
        $scope.Refresh_Data();
    };
    $scope.prev_btn = function () {
        if ($scope.start > 0) {
            if ($scope.focus > 0) {
                $scope.focus--;
            } else {
                $scope.focus = 9;
                $scope.page_index = $scope.page_index - 10;
            }
            $scope.start = $scope.start - 10;
            $scope.end = $scope.end - 10;
            $scope.clear_info();
            $scope.Refresh_Data();
        }
    };
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
});