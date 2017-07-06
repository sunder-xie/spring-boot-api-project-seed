<%@ page language="java" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath =
            request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <title>My JSP 'sosotd.jsp' starting page</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximumscale=1">
    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->
    <style type="text/css">
        * {
            margin: 0px;
            padding: 0px;
        }

        body, button, input, select, textarea {
            font: 12px/16px Verdana, Helvetica, Arial, sans-serif;
        }
    </style>
    <script charset="utf-8"
            src="http://map.soso.com/api/v2/main.js?key=LS3BZ-FYN3U-JVYVQ-2OVD3-SKENQ-CYBZ2"></script>
    <script>
        var map,
            directionsService = new soso.maps.DrivingService({
                complete: function (response) {
                    var start = response.detail.start,
                        end = response.detail.end;
                    var anchor = new soso.maps.Point(6, 6),
                        size = new soso.maps.Size(24, 36),
                        start_icon = new soso.maps.MarkerImage(
                            'img/busmarker.png',
                            size,
                            new soso.maps.Point(0, 0),
                            anchor
                        ),
                        end_icon = new soso.maps.MarkerImage(
                            'img/busmarker.png',
                            size,
                            new soso.maps.Point(24, 0),
                            anchor
                        );
                    start_marker && start_marker.setMap(null);
                    end_marker && end_marker.setMap(null);
                    clearOverlay(route_lines);
                    start_marker = new soso.maps.Marker({
                        icon: start_icon,
                        position: start.latLng,
                        map: map,
                        zIndex: 1
                    });
                    end_marker = new soso.maps.Marker({
                        icon: end_icon,
                        position: end.latLng,
                        map: map,
                        zIndex: 1
                    });
                    directions_routes = response.detail.routes;
                    var routes_desc = [];
                    //所有可选路线方案
                    for (var i = 0; i < directions_routes.length; i++) {
                        var route = directions_routes[i],
                            legs = route;
                        //调整地图窗口显示所有路线
                        map.fitBounds(response.detail.bounds);
                        //所有路程信息
                        //for(var j = 0 ; j < legs.length; j++){
                        var steps = legs.steps;
                        route_steps = steps;
                        polyline = new soso.maps.Polyline(
                            {
                                path: route.path,
                                strokeColor: '#3893F9',
                                strokeWeight: 6,
                                map: map
                            }
                        )
                        route_lines.push(polyline);
                        //所有路段信息
                        for (var k = 0; k < steps.length; k++) {
                            var step = steps[k];
                            //路段途经地标
                            directions_placemarks.push(step.placemarks);
                            //转向
                            var turning = step.turning,
                                img_position;
                            ;
                            switch (turning.text) {
                                case '左转':
                                    img_position = '0px 0px'
                                    break;
                                case '右转':
                                    img_position = '-19px 0px'
                                    break;
                                case '直行':
                                    img_position = '-38px 0px'
                                    break;
                                case '偏左转':
                                case '靠左':
                                    img_position = '-57px 0px'
                                    break;
                                case '偏右转':
                                case '靠右':
                                    img_position = '-76px 0px'
                                    break;
                                case '左转调头':
                                    img_position = '-95px 0px'
                                    break;
                                default:
                                    mg_position = ''
                                    break;
                            }
                            var turning_img = '&nbsp;&nbsp;<span' +
                                ' style="margin-bottom: -4px;' +
                                'display:inline-block;background:' +
                                'url(img/turning.png) no-repeat ' +
                                img_position + ';width:19px;height:' +
                                '19px"></span>&nbsp;';
                            var p_attributes = [
                                'onclick="renderStep(' + k + ')"',
                                'onmouseover=this.style.background="#eee"',
                                'onmouseout=this.style.background="#fff"',
                                'style="margin:5px 0px;cursor:pointer"'
                            ].join(' ');
                            routes_desc.push('<p ' + p_attributes + ' ><b>' + (k + 1) +
                                '.</b>' + turning_img + step.instructions);
                        }
                        //}
                    }
                    //方案文本描述
                    var routes = document.getElementById('routes');
                    routes.innerHTML = routes_desc.join('<br>');
                }
            }),
            directions_routes,
            directions_placemarks = [],
            directions_labels = [],
            start_marker,
            end_marker,
            route_lines = [],
            step_line,
            route_steps = [];
        function init(lat1, lng1) {
            map = new soso.maps.Map(document.getElementById("container"), {
                // 地图的中心地理坐标。
                //center: new soso.maps.LatLng(39.916527,116.397128)
                center: new soso.maps.LatLng(lat1, lng1)
                // alert(lat);
            });
            calcRoute();
        }
        function calcRoute() {
            var start_name = document.getElementById("start").value.split(",");
            var end_name = document.getElementById("end").value.split(",");
            var policy = document.getElementById("policy").value;
            //var ss=str.split("@");
            route_steps = [];
            var city = document.getElementById("city").value;
            directionsService.setLocation(city);
            directionsService.setPolicy(soso.maps.DrivingPolicy[policy]);
            directionsService.search(new soso.maps.LatLng(start_name[1], start_name[0]), new
            soso.maps.LatLng(end_name[1], end_name[0]));
        }
        //清除地图上的marker
        function clearOverlay(overlays) {
            var overlay;
            while (overlay = overlays.pop()) {
                overlay.setMap(null);
            }
        }
        function renderStep(index) {
            var step = route_steps[index];
            //clear overlays;
            step_line && step_line.setMap(null);
            //draw setp line
            step_line = new soso.maps.Polyline(
                {
                    path: step.path,
                    strokeColor: '#ff0000',
                    strokeWeight: 6,
                    map: map
                }
            )
        }
        //显示路段路标
        function showP() {
            var showPlacemark = document.getElementById('sp');
            if (showPlacemark.checked) {
                for (var i = 0; i < directions_placemarks.length; i++) {
                    var placemarks = directions_placemarks[i];
                    for (var j = 0; j < placemarks.length; j++) {
                        var placemark = placemarks[j];
                        var label = new soso.maps.Label({
                                map: map,
                                position: placemark.latLng,
                                content: placemark.name
                            })
                        ;
                        directions_labels.push(label);
                    }
                }
            } else {
                clearOverlay(directions_labels);
            }
        }
    </script>
</head>
<%
    String str = request.getParameter("str"); // 结合微信经纬度 传值过了的是
    lat
    @lng @lat1 @lng1 @city
    String[] latlng = str.split("@");
    String lat = latlng[0];
    String lng = latlng[1];
    String lat1 = latlng[2];
    String lng1 = latlng[3];
    String city = latlng[4]; //最笨的方法分割处理
    System.out.println(city);
    System.out.println(lat);
    System.out.println(lng);
%>
<body onload="init(<%=lat1%>,<%=lng1%>);">
<div style='margin:5px 0px'>
    <input id="start" name="start" type="hidden" onchange="calcRoute();" value="
            <%=lng%>,<%=lat%>">
    <input id="end" name="end" type="hidden" onchange="calcRoute();" value="
            <%=lng1%>,<%=lat1%>">
    <input id="city" type="hidden" onchange="calcRoute();" value="'<%=city%>'">
    <b>计算策略：</b>
    <select id="policy" onchange="calcRoute();">
        <option value="LEAST_TIME">最少时间</option>
        <option value="LEAST_DISTANCE">最短距离</option>
        <option value="AVOID_HIGHWAYS">避开高速</option>
        <option value="REAL_TRAFFIC">实时路况</option>
        <option value="PREDICT_TRAFFIC">预测路况</option>
    </select>
    <label>
        <input id="sp" type="checkbox" value='1' onclick='showP()'/>
        显示路段地标
    </label>
</div>
<div style="width:603px;height:300px" id="container"></div>
<div style="width:603px;padding-top:5px" id="routes"></div>
</body>
</html>