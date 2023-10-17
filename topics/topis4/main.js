import * as THREE from 'three'
// スクロールやドラッグで視点を操作できるように
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// 3dファイルを読み込めるように
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'



// canvas読み込み
const canvas = document.querySelector('canvas.project')


// シーンを定義
const scene = new THREE.Scene()


// 3dオブジェクトファイルを読み込むローダーを定義
const gltfLoader = new GLTFLoader()



// 3dファイルから3dオブジェクトを読み込む
gltfLoader.load(
    'ironman helmet.glb',
    (gltf) => {
        scene.add(gltf.scene)
        const portal = gltf.scene.children.find((child) => child.name === 'portal')
        portal.material = portalShader

    }
)


// シェーダーの設定
const portalShader = new THREE.ShaderMaterial({
    uniforms:
    {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color('#34d8eb') },
        uColorEnd: { value: new THREE.Color('#3489eb') }
    },
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader
})



//ライトの設定
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(-5, 5, 3)
scene.add(directionalLight)



// ウィンドウサイズに応じて可変するように設定
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// PerspectiveCamera　⇒　透視投影を使用するカメラ(垂直視野、アスペクト比、近景、遠景）
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
//　カメラの位置を調整
camera.position.x = 4
camera.position.y = 6
camera.position.z = 6
scene.add(camera)


// ユーザー側でドラッグ等でカメラを動かせるようにする
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// レンダリング
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // 物体の輪郭がガクガクするのを抑える
    antialias: true
})
// レンダラーの出力をsRGBに設定、これをしないと意図してない色になったりする。
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
// 解像度を調整、Retinaにも対応
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// loopという関数を各フレームで実行する無限ループ。
// モニターのフレームレートに関与せず、1フレームごとにレンダリングを行う関数を実行する。
const clock = new THREE.Clock()
const loop = () => {
    // シェーダーを動かす
    const elapsedTime = clock.getElapsedTime()
    portalShader.uniforms.uTime.value = elapsedTime
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}


loop()