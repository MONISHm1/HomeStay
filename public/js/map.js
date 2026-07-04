console.log("L =", typeof L);


if (typeof L !== "undefined") {

    
    if (typeof listingLat !== "undefined" && typeof listingLng !== "undefined") {

        console.log("listingLat =", listingLat);
        console.log("listingLng =", listingLng);

        const mapElement = document.getElementById("map");

       
        if (mapElement) {

            const map = L.map("map").setView(
                [listingLat, listingLng],
                12
            );

            L.tileLayer(
                "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    maxZoom: 19,
                    attribution: "&copy; OpenStreetMap"
                }
            ).addTo(map);

            L.marker([listingLat, listingLng]).addTo(map);
        }
    }
}