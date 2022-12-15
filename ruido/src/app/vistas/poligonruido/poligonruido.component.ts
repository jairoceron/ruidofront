import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
//import {MarkerClusterGroup} from "leaflet.markercluster";
import 'leaflet.markercluster';
import addressPoints from './../../../assets/location.json';
import 'leaflet/dist/leaflet.css';
//declare let LL:any;
import "leaflet-routing-machine";
//import "leaflet.locatecontrol";
//import "@runette/leaflet-fullscreen";


@Component({
  selector: 'app-poligonruido',
  templateUrl: './poligonruido.component.html',
  styleUrls: ['./poligonruido.component.scss']
})
export class PoligonruidoComponent implements OnInit, AfterViewInit {
  public path = '';
  public lat = '';
  public lng = '';
  public mymap = '';
  public distance = '';
  public infoPanel = '';
  //public ll = LL;
  public btn = '';
  public del = '';

  private map :any

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

  getRoute() {

    let waypoints: any[] = [];
    waypoints[0] = this.createLatLng(4.2, 71.3);
    waypoints[1] = this.createLatLng(4.3, 71.23);
    console.log("gdmptlb");





    this.map.on('click', function(event:any) {

      // New marker on coordinate, add it to the map
      // new L.Marker(event.latlng).addTo(this.map);
  
      // Add coordinate to the polyline
      // polyline.addLatLng(event.latlng);
      console.log('ccccc' , event);
      var latlng = L.latLng(50.5, 30.5);
      console.log("esto debe funcionar :: " , event.latlng);
      new L.Marker(event.latlng);
  
  });
    /*
    this.path=LL.Routing.control({
      waypoints:waypoints,
      show:false,
      createMarker: (i:number,wp:Puntox, n:number)=>this.customMarker(i,wp,n) })
    .addTo(this.mymap)
   
    .on('routesfound', (e:Event)=> 
    {
    // this.distance = e.routes[0].summary.totalDistance;
    // this.updateInfopanel(this.distance)
    console.log('routing distance: ' + this.distance)
    }
    )
*/
  let px : Puntox = {name:'Radicado', latLng:'22'};
this.customMarker(0, px , 88) ;
  }

  customMarker(i: number, wp: Puntox, n: number) {
    var container = L.DomUtil.create('div');
    let title: string = (wp.name ? wp.name : "" + (i + 1));
    let popup = title + ' <button id="del" class="del btn btn-outline-info btn-sm" >Save</button>';

    var polyline = new L.Polyline([]).addTo(this.map);
   


    var latlng = L.latLng(4.712455265176265, -74.10167075721328);
    
  let marker = L.marker(latlng , {
                draggable: true,
              
                icon: L.icon({
                  iconUrl: '//api.nostramap.com/developer/asset/image/pin/pin_'+ (i+1)+".png",
                  iconSize: [32, 46],
                  iconAnchor: [17, 46],
                 
                })
              })
              marker.addTo(this.map);
  
    
              return marker.bindTooltip(
                title,
                {permanent:true,direction:'bottom'}
              ).on('click',(e)=> {this.onClickGdmptlb(e)}).bindPopup(popup+n+i).openPopup()
      
  }

  /**
   *  return marker.bindTooltip(
              title,
              {permanent:true,direction:'bottom'}
            ).on('click',(e)=> {this.onClick(e)}).bindPopup(popup+n+i).openPopup()
   * 
   */


  createLatLng(latitude: number, longitude: number) {
    // return L.latLng(latitude, longitude);
  }

  onClickGdmptlb(data:any){
    //let e = JSON.stringify(data)
    console.log("data clcik",data);
   // alert("clecked")
 
   }

}

export interface Puntox {
  name: string,
  latLng: string,
}


