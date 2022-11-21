import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
//import {MarkerClusterGroup} from "leaflet.markercluster";
import 'leaflet.markercluster';
import addressPoints from './../../../assets/location.json';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-poligonruido',
  templateUrl: './poligonruido.component.html',
  styleUrls: ['./poligonruido.component.scss']
})
export class PoligonruidoComponent implements OnInit, AfterViewInit {

  private map: any;

  /*
    tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
      }
    );
  */
  private initMap(): void {
    this.map = L.map('map', {
      center: [4.76043458, -74.03147118],
      zoom: 3
    });

    

    var tiles = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="//openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    });
    /*
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
    */
    tiles.addTo(this.map);
  }

  constructor() { }
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initMap();
    this.generarMapa();
  }
  generarMapa() {

    //   var markers = L.markerClusterGroup();
    var mcg = L.markerClusterGroup({
      chunkedLoading: true,
      //singleMarkerMode: true,
      spiderfyOnMaxZoom: false
    });
    const markerCluster = new L.MarkerClusterGroup();


    let markerIcon =
      L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        // specify the path here
        iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
      })

    for (let i = 0; i < addressPoints.length; i++) {
      const title = addressPoints[i][2] as string;
      const lat = addressPoints[i][0] as number;
      const lng = addressPoints[i][1] as number;
      const marker = L.marker(new L.LatLng(lat, lng), { title: title, icon: markerIcon });
      marker.bindPopup(title);
      markerCluster.addLayer(marker);
    }
    this.map.addLayer(markerCluster);
  }

}
