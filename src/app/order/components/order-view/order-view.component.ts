import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/Addons'
import { OBJLoader } from 'three/examples/jsm/Addons'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;
  @Input() objPath: string = "";
  @Input() objName: string = "";

  constructor(private http: HttpClient){}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createScene();
    this.loadFromPath()

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement });
    this.renderer.setPixelRatio(this.canvasRef.nativeElement.devicePixelRatio);
    this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);
    this.renderer.shadowMap.enabled = true;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 100, 0);
    this.controls.update();

    let component = this;
    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    })();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['objPath'] && !changes['objPath'].isFirstChange()) {
      this.reloadObject()
    }
  }

  loadFromPath() {
    const ext = this.objName.substring(this.objName.lastIndexOf(".")); 

    if(ext == ".fbx")
      this.fbxLoader.load(this.objPath, (object) => {

        object.traverse(function (child) {
          if (child.isObject3D) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        object.name = "baseObject";
        this.scene.add(object);
      }, (data) => {  }, (err) => { console.error(err) });

    if(ext == ".obj")
      this.objLoader.load(this.objPath, (object)=> {
        
        object.name = "baseObject";
        this.scene.add(object);
      }, (data) => {  }, (err) => { console.error(err) })
      
    }

  reloadObject() {
    let sObject = this.scene.getObjectByName("baseObject");
    if (sObject)
    {
      this.scene.remove(sObject);
    }
    this.loadFromPath();
  }

  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private fbxLoader: FBXLoader;
  private objLoader: OBJLoader;

  createScene() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.canvasRef.nativeElement.width / this.canvasRef.nativeElement.height,
      1,
      2000);
    this.camera.position.set(700, 600, 400);

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xa0a0a0);
    // this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
    hemiLight.position.set(0, 200, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 5);
    dirLight.position.set(0, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = - 100;
    dirLight.shadow.camera.left = - 120;
    dirLight.shadow.camera.right = 120;
    this.scene.add(dirLight);

    // ground
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    // this.scene.add(mesh);

    const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    // this.scene.add(grid);

    this.fbxLoader = new FBXLoader();
    this.objLoader = new OBJLoader();
  }

}
