import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../inteface/user.interface'
import { Coordinate } from 'src/app/inteface/coordinate.interface';
import * as Leaflet from 'leaflet'
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  user: User
  mode: 'edit' | 'locked' = 'locked'
  buttonText: 'Save' | 'Edit' = 'Edit'
  marker = new Leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  })

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.user = (<User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]))
    console.log(this.user)
    this.loadMap(this.user.coordinate)
    this.initializeMap();
    // this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
    //   console.log('User ID:',params.get('uuid')!)
    //   this.userService.getUser(params.get('uuid')!).subscribe(
    //     (response:any)=>{
    //       console.log(response)
    //       this.response=response
    //     }
    //   )
    // })
  }

  changeMode(mode?: 'edit' | 'locked'): void {
    console.log(mode)
    this.mode = this.mode === 'locked' ? 'edit' : 'locked'
    this.buttonText = this.buttonText === 'Edit' ? 'Save' : 'Edit'
    if (mode === 'edit') {
      //Logic to update user on the backend
      console.log('Updating user on the backend')
    }
  }
  private loadMap(coordinate: Coordinate): void {
    const map = Leaflet.map('map', {
      center: [coordinate.latitude, coordinate.logitude],
      zoom: 5
    })
    const mainLayer = Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 30,
      crossOrigin: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    mainLayer.addTo(map)
    const marker = Leaflet.marker([coordinate.latitude, coordinate.logitude], { icon: this.marker })
    marker.addTo(map).bindPopup(`${this.user.firstName}'s Location`).openPopup();
  }
  initializeMap() {
    loadModules(["esri/config", "esri/Map", "esri/views/MapView", "esri/widgets/Search"])
      .then(([esriConfig, Map, MapView, Search]) => {
        esriConfig.apiKey = "AAPK55a205179cb4403d99f7e33d86d96bd7QHWLJF3NTC9GaOe7e26nDsWVx8NBFzRSnXcuU2Lrncrp4xkq3LscKZWsrfYF5dXL"; // Replace with your API key

        const map = new Map({
          basemap: "arcgis-navigation"
        });

        const view = new MapView({
          map,
          center: [-122.3321, 47.6062], // Longitude, latitude
          zoom: 12, // Zoom level
          container: "viewDiv" // Div element
        });

        const search = new Search({
          view:view
        });

        view.ui.add(search, "top-right");
      })
      .catch(error => {
        console.error("Error loading ArcGIS modules:", error);
      });
  }

}
