var map;
var lat = 36.2935247
var lng = 59.5579335
var flag = false

function get_distance(start, end) {
    x1 = start.lat()
    y1 = start.lng()

    x2 = end.lat()
    y2 = end.lng()
    var distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    return distance;
}

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 14,
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        var myCenter = new google.maps.LatLng(lat, lng);

        map.setCenter(myCenter);
        var marker_start = new google.maps.Marker({
            position: myCenter,
            draggable: true,
            animation: google.maps.Animation.BOUNCE,
            icon: 'img/minion.png',




        });
        marker_start.setMap(map);

        google.maps.event.addListener(marker_start, 'click', (function () {

            // var tag_p_lat = document.getElementById("lat_start");
            // var tag_p_lng = document.getElementById("lng_start");

            var selected_location = marker_start.getPosition();

            // tag_p_lat.innerHTML = selected_location.lat();
            // tag_p_lng.innerHTML = selected_location.lng();

            if (flag == false) {

                flag = true
                var message1 = document.getElementById("message");
                message1.innerHTML = "مقصد را انتخاب کنید"
                message1.classList.remove("alert-warning");
                message1.classList.add("alert-primary");
                var marker_end = new google.maps.Marker({
                    position: myCenter,
                    draggable: true,
                    animation: google.maps.Animation.BOUNCE,




                });
                marker_end.setMap(map);

                google.maps.event.addListener(marker_end, 'click', (function () {

                    // var tag_p_lat = document.getElementById("lat_end");
                    // var tag_p_lng = document.getElementById("lng_end");

                    var selected_location_end = marker_end.getPosition();

                    // tag_p_lat.innerHTML = selected_location_end.lat();
                    // tag_p_lng.innerHTML = selected_location_end.lng();

                    distance = get_distance(selected_location, selected_location_end)
                    var price = Math.round(distance * 1000);

                    price = price.toFixed(2)

                    var message = document.getElementById("message");
                    message.innerHTML = "در خواست سفر شما ثبت شد هزینه سفر " + price + " هزار تومان";
                    message.classList.remove("alert-warning");
                    message.classList.add("alert-success");
                    showNotification();
                    
                    show({ croods: { lat: 36.327448, lng: 59.516608 } })
                    show({ croods: { lat: 36.322243, lng: 59.514993 } })
                }))

            }
        }))

    });
}
else {
    alert("Geolocation is not supported by this browser.");
}

function show(props) {


    // var pos = new google.maps.LatLng(taxi[i].lat, taxi[i].lng);
    var marker_taxi = new google.maps.Marker({
        position: props.croods,
        map: map,
        icon: 'img/taxi.png',

    });


}
