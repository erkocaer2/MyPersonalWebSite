
function showPanel(placeData) {
    console.log("Gelen Veri:", placeData);
    var panel = document.getElementById('sidePanel');
    var titleEl = document.getElementById('panelTitle');
    var descEl = document.getElementById('panelDesc');
    var imgEl = document.getElementById('panelImg');
    imgEl.src = placeData.img;

    titleEl.style.opacity = 0;
    descEl.style.opacity = 0;
    
    setTimeout(() => {
        titleEl.innerText = translations[currentLang][placeData.titleKey];
        titleEl.setAttribute('data-i18n', placeData.titleKey); 
        
        descEl.innerText = translations[currentLang][placeData.descKey];
        descEl.setAttribute('data-i18n', placeData.descKey);

        imgEl.src = placeData.img;
        
        titleEl.style.opacity = 1;
        descEl.style.opacity = 1;
    }, 200);

    panel.classList.add('active'); 
    document.body.classList.add('panel-open');
}

window.closePanel = function() {
    document.getElementById('sidePanel').classList.remove('active');
    document.body.classList.remove('panel-open');
}


var worldBounds = [
    [-90, -180], 
    [90, 180]    
];

var lMap = L.map('leaflet-map', {
    worldCopyJump: false,
    maxBounds: worldBounds, 
    maxBoundsViscosity: 1.0, 
    minZoom: 2 
}).setView([39.0, 35.0], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    noWrap: true,
    attribution: '© OpenStreetMap'
}).addTo(lMap);

var cityData = {
    'agri': { coords: [39.7191, 43.0503], titleKey: "loc-agri", descKey: "desc-agri", img: "img/agri.jpg" },
    'ankara': { coords: [39.9208, 32.8541], titleKey: "loc-ankara", descKey: "desc-ankara", img: "img/ankara.jpg" },
    'antalya': { coords: [36.8969, 30.7133], titleKey: "loc-antalya", descKey: "desc-antalya", img: "img/antalya.jpeg" },
    'ardahan': { coords: [41.1105, 42.7022], titleKey: "loc-ardahan", descKey: "desc-ardahan", img: "img/ardahan.webp" },
    'balikesir': { coords: [39.6484, 27.8826], titleKey: "loc-balikesir", descKey: "desc-balikesir", img: "img/balikesir.jpg" },
    'canakkale': { coords: [40.1553, 26.4127], titleKey: "loc-canakkale", descKey: "desc-canakkale", img: "img/canakkale.jpg" },
    'istanbul': { coords: [41.0082, 28.9784], titleKey: "loc-istanbul", descKey: "desc-istanbul", img: "img/istanbul.webp" },
    'izmir': { coords: [38.4192, 27.1287], titleKey: "loc-izmir", descKey: "desc-izmir", img: "img/izmir.jpg" },
    'mersin': { coords: [36.8121, 34.6415], titleKey: "loc-mersin", descKey: "desc-mersin", img: "img/mersin.jpg" },
    'trabzon': { coords: [41.0027, 39.7168], titleKey: "loc-trabzon", descKey: "desc-trabzon", img: "img/trabzon.jpg" }
};


var markersGroup = L.markerClusterGroup();

Object.keys(cityData).forEach(function(key) {
    var place = cityData[key];
    var marker = L.marker(place.coords);
    marker.on('click', function() { goToCity(key); });
    markersGroup.addLayer(marker);
});


lMap.addLayer(markersGroup);

window.goToCity = function(key) {
    var coords = cityData[key].coords;
    lMap.flyTo(coords, 10, { duration: 1.5 });
    showPanel(cityData[key]);
};


var ankaraData = {
    'anitkabir': { coords: [32.8369, 39.9255], titleKey: "loc-anitkabir", descKey: "desc-anitkabir", img: "img/anitkabir.png", type: "historical" },
    'kale': { coords: [32.8655, 39.9414], titleKey: "loc-kale", descKey: "desc-kale", img: "img/ankarakalesi.jpg", type: "historical" },
    'meclis': { coords: [32.8546, 39.9412], titleKey: "loc-meclis", descKey: "desc-meclis", img: "img/meclis.jpg", type: "historical" },
    'cankaya': { coords: [32.8642, 39.8885], titleKey: "loc-cankaya", descKey: "desc-cankaya", img: "img/cankaya.jpg", type: "historical" },
    'ankamall': { coords: [32.8315, 39.9507], titleKey: "loc-ankamall", descKey: "desc-ankamall", img: "img/ankamall.jpg", type: "mall" },
    'armada': { coords: [32.8094, 39.9125], titleKey: "loc-armada", descKey: "desc-armada", img: "img/armada.jpg", type: "mall" },
    'kizilay': { coords: [32.8541, 39.9208], titleKey: "loc-kizilay", descKey: "desc-kizilay", img: "img/kizilay.jpeg", type: "social" },
    '7cadde': { coords: [32.8225, 39.9192], titleKey: "loc-7cadde", descKey: "desc-7cadde", img: "img/7.cadde.webp", type: "social" },
    'sakarya': { coords: [32.8550, 39.9215], titleKey: "loc-sakarya", descKey: "desc-sakarya", img: "img/sakaryacaddesi.jpg", type: "social" },
    'tunali': { coords: [32.8601, 39.9077], titleKey: "loc-tunali", descKey: "desc-tunali", img: "img/tunali.jpg", type: "social" },
    'goksu': { coords: [32.6288, 39.9806], titleKey: "loc-goksu", descKey: "desc-goksu", img: "img/goksuparki.jpg", type: "social" },
    'aoc': { coords: [32.7986, 39.9328], titleKey: "loc-aoc", descKey: "desc-aoc", img: "img/aoc.jpg", type: "social" },
    'hacettepe': { coords: [32.7340, 39.8680], titleKey: "loc-hacettepe", descKey: "desc-hacettepe", img: "img/hacettepe.jpg", type: "social" }
};

var features = [];
Object.keys(ankaraData).forEach(function(key) {
    var place = ankaraData[key];
    var feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(place.coords)),
        id: key,
        type: place.type
    });
    features.push(feature);
});

var vectorSource = new ol.source.Vector({ features: features });

var clusterSource = new ol.source.Cluster({
    distance: 40,
    source: vectorSource
});

var styleCache = {};
var styleFunction = function(feature) {
    var size = feature.get('features').length;
    
    if (size > 1) {
        var style = styleCache[size];
        if (!style) {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 12,
                    stroke: new ol.style.Stroke({ color: '#ffffff', width: 2 }),
                    fill: new ol.style.Fill({ color: '#2b2d30' })
                }),
                text: new ol.style.Text({
                    text: size.toString(),
                    fill: new ol.style.Fill({ color: '#ffffff' }),
                    font: 'bold 12px Poppins, sans-serif'
                })
            });
            styleCache[size] = style;
        }
        return style;
    } else {
        var originalFeature = feature.get('features')[0];
        var type = originalFeature.get('type');
        var fillColor = '#2b2d30';
        
        if (type === 'historical') fillColor = '#e74c3c'; 
        else if (type === 'mall') fillColor = '#f39c12'; 
        else if (type === 'social') fillColor = '#3498db'; 
        
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({ color: fillColor }),
                stroke: new ol.style.Stroke({ color: '#ffffff', width: 2 })
            })
        });
    }
};

var clusterLayer = new ol.layer.Vector({
    source: clusterSource,
    style: styleFunction
});

var ankaraExtent = ol.proj.transformExtent(
    [32.30, 39.60, 33.10, 40.10], 
    'EPSG:4326', 'EPSG:3857'
);

var olMap = new ol.Map({
    target: 'ol-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                wrapX: false
            })
        }),
        clusterLayer
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([32.82, 39.90]), 
        zoom: 11,
        minZoom: 10,
        extent: ankaraExtent
    })
});

window.goToLocation = function(key) {
    var coords = ankaraData[key].coords;
    olMap.getView().animate({
        center: ol.proj.fromLonLat(coords),
        zoom: 15,
        duration: 1200
    });
    showPanel(ankaraData[key]);
};

olMap.on('pointermove', function(e) {
    if (e.dragging) return;
    var hit = olMap.hasFeatureAtPixel(e.pixel, { hitTolerance: 5 }); 
    olMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
});

olMap.on('singleclick', function(evt) {
    var feature = olMap.forEachFeatureAtPixel(evt.pixel, function(feat) { return feat; }, { hitTolerance: 5 });
    
    if (feature) {
        var clusterFeatures = feature.get('features');
        
        if (clusterFeatures.length > 1) {
            var extent = ol.extent.createEmpty();
            clusterFeatures.forEach(function(f) {
                ol.extent.extend(extent, f.getGeometry().getExtent());
            });
            olMap.getView().fit(extent, { 
                duration: 1000, 
                padding: [80, 80, 80, 80], 
                maxZoom: 16
            });
        } else if (clusterFeatures.length === 1) {
            var key = clusterFeatures[0].get('id');
            goToLocation(key);
        }
    } else {
        closePanel(); 
    }
});