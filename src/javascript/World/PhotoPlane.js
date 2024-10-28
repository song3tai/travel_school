import * as THREE from 'three'

export default class PhotoPlane {
    constructor(imageUrl, width = 1, height = 1, position = new THREE.Vector3(0, 0, 0)) {
        this.imageUrl = imageUrl
        this.width = width
        this.height = height
        this.position = position

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.init()
    }

    init() {
        // 创建纹理加载器
        const textureLoader = new THREE.TextureLoader()

        // 加载图片纹理
        textureLoader.load(this.imageUrl, (texture) => {
             // 设置纹理参数
             texture.minFilter = THREE.LinearFilter
             texture.magFilter = THREE.LinearFilter
             texture.wrapS = THREE.ClampToEdgeWrapping
             texture.wrapT = THREE.ClampToEdgeWrapping
 
            // 创建平面几何体
            const geometry = new THREE.PlaneGeometry(this.width, this.height)

            // 创建材质
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide, // 使平面的两面都可见
                transparent: true,     // 启用透明
                alphaTest: 0.5,       // 设置透明度测试阈值
                depthWrite: true     // 防止透明物体的深度写入问题
            })

            // 创建网格
            this.mesh = new THREE.Mesh(geometry, material)

            // 设置位置
            this.mesh.position.copy(this.position)

            // 将网格添加到场景
            this.container.add(this.mesh)
        },
        () => {
            console.log('加载进度');
        },
        (error) => {
            console.log('加载failed',error,this.imageUrl);
        }
    )
    }
}

