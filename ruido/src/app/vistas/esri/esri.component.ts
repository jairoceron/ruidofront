import { Component, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';
//import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
//import MapView from '@arcgis/core/views/MapView';
//import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { loadScript } from 'esri-loader';
// import Map from "@arcgis/core/Map.js";
//import Attachments from '@arcgis/core/widgets/Attachments';
//import MapImageLayer from '@arcgis/core/layers/MapImageLayer';


@Component({
  selector: 'app-esri',
  templateUrl: './esri.component.html',
  styleUrls: ['./esri.component.scss']
})
export class EsriComponent  implements OnInit {


  ngOnInit(): void {
   // this.inxxxx() ;
  }


  constructor() {

    loadModules(['esri/views/MapView', 'esri/WebMap'])
    .then(([MapView, WebMap]) => {
      // then we load a web map from an id
      const webmap = new WebMap({
        portalItem: { // autocasts as new PortalItem()
          id: 'f2e9b762544945f390ca4ac3671cfa72'
        }
      });
      // and we show that map in a container w/ id #viewDiv
      const view = new MapView({
        map: webmap,
        container: 'viewDiv'
      });
    })
    .catch(err => {
      // handle any errors
      console.error(err);
    });
    

    }

   inxxxx()  {
    console.log(`************ I will init eagerly`);
    /*
    const map = new Map({
      basemap: 'dark-gray'
    });
*/
   // center: [-116.3031, 43.6088],
   // zoom: 12
   /* 
    const view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [-116.3031, 43.6088], // lon, lat
      // scale: 577790.554289
      zoom: 12
    });
*/
    /*
    const mapImageLayer2 = new MapImageLayer({
      url:
        'https://geocimab.ambientebogota.gov.co/wserver/rest/services/SIIGAR_GESTION/FeatureServer/0'
    });
  */

    // esri-support
    // 27!$dJskeB
  
  //  map.add(mapImageLayer2);

   }
  
/*
  map : Map = new Map({
     // basemap: 'satellite'
     // basemap: 'dark-gray'
     // basemap: "streets" 
     basemap: 'dark-gray',
    });
*/

    
    /*
     view = new MapView({
      container: 'viewDiv',
      map: this.map,
      zoom: 4,
      center: [-74.0531292, 4.759873],
    });
 */

   options  = {
    url:
       "https://geocimab.ambientebogota.gov.co/wserver/rest/services/SIIGAR_GESTION/FeatureServer/0",      
    where: "radicado = '2020ER72132'"
  };

  /*
  featureLayer = new FeatureLayer({
     url: 'https://geocimab.ambientebogota.gov.co/wserver/rest/services/SIIGAR_GESTION/FeatureServer/0',
   // url: 'https://portal.rizing.com/server/rest/services/Omni/Sync_Testing/FeatureServer/0',
    outFields: ['*'],
  });
*/
  arranca(): void {



   
 console.log('loladrones')
 /* 
 queryFeatures(this.options)
  .then(response => {
    console.log('lola');
    console.log(response); // 500
  }); 
*/
  // const attachments = new Attachments({});
  // this.map.add(this.featureLayer);
  // this.view.ui.add(attachments, 'top-right');

 /* 
  this.featureLayer.when(async () => {
    const result = await this.featureLayer.queryFeatures({
      objectIds: [9],
    });
    console.log('generacion grafica :::  ', result);
    attachments.graphic = result.features[0];
  });
*/
  }


  //

  

 

}


