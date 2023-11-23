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
  



   }


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


  }


  //

  

 

}


