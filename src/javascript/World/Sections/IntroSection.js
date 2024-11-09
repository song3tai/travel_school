import * as THREE from 'three'
import PhotoPlane from '../PhotoPlane.js'


export default class IntroSection
{
    constructor(_options)
    {
        // Options
        this.config = _options.config
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.walls = _options.walls
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setStatic()
        this.setInstructions()
        this.setOtherInstructions()
        this.setTitles()
        this.setTiles()
        this.setDikes()
        this.setPhotoPlane()
        this.setSchoolLogo()
        this.setFootball()
    }

    setStatic()
    {
        this.objects.add({
            base: this.resources.items.introStaticBase.scene,
            collision: this.resources.items.introStaticCollision.scene,
            floorShadowTexture: this.resources.items.introStaticFloorShadowTexture,
            offset: new THREE.Vector3(0, 0, 0),
            mass: 0
        })
    }

    setInstructions()
    {
        this.instructions = {}

        /**
         * Arrows
         */
        this.instructions.arrows = {}

        // Label
        this.instructions.arrows.label = {}

        this.instructions.arrows.label.texture = this.config.touch ? this.resources.items.introInstructionsControlsTexture : this.resources.items.introInstructionsArrowsTexture
        this.instructions.arrows.label.texture.magFilter = THREE.NearestFilter
        this.instructions.arrows.label.texture.minFilter = THREE.LinearFilter

        this.instructions.arrows.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.instructions.arrows.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })

        this.instructions.arrows.label.geometry = this.resources.items.introInstructionsLabels.scene.children.find((_mesh) => _mesh.name === 'arrows').geometry

        this.instructions.arrows.label.mesh = new THREE.Mesh(this.instructions.arrows.label.geometry, this.instructions.arrows.label.material)
        this.container.add(this.instructions.arrows.label.mesh)

        if(!this.config.touch)
        {
            // Keys
            this.instructions.arrows.up = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(0, 0, 0),
                rotation: new THREE.Euler(0, 0, 0),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.down = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(0, - 0.8, 0),
                rotation: new THREE.Euler(0, 0, Math.PI),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.left = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(- 0.8, - 0.8, 0),
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.right = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(0.8, - 0.8, 0),
                rotation: new THREE.Euler(0, 0, - Math.PI * 0.5),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
        }
    }

    setOtherInstructions()
    {
        if(this.config.touch)
        {
            return
        }

        this.otherInstructions = {}
        this.otherInstructions.x = 16
        this.otherInstructions.y = - 2

        // Container
        this.otherInstructions.container = new THREE.Object3D()
        this.otherInstructions.container.position.x = this.otherInstructions.x
        this.otherInstructions.container.position.y = this.otherInstructions.y
        this.otherInstructions.container.matrixAutoUpdate = false
        this.otherInstructions.container.updateMatrix()
        this.container.add(this.otherInstructions.container)

        // Label
        this.otherInstructions.label = {}

        this.otherInstructions.label.geometry = new THREE.PlaneGeometry(6, 6, 1, 1)

        this.otherInstructions.label.texture = this.resources.items.introInstructionsOtherTexture
        this.otherInstructions.label.texture.magFilter = THREE.NearestFilter
        this.otherInstructions.label.texture.minFilter = THREE.LinearFilter

        this.otherInstructions.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.otherInstructions.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })

        this.otherInstructions.label.mesh = new THREE.Mesh(this.otherInstructions.label.geometry, this.otherInstructions.label.material)
        this.otherInstructions.label.mesh.matrixAutoUpdate = false
        this.otherInstructions.container.add(this.otherInstructions.label.mesh)

        // Horn
        this.otherInstructions.horn = this.objects.add({
            base: this.resources.items.hornBase.scene,
            collision: this.resources.items.hornCollision.scene,
            offset: new THREE.Vector3(this.otherInstructions.x + 1.25, this.otherInstructions.y - 2.75, 0.2),
            rotation: new THREE.Euler(0, 0, 0.5),
            duplicated: true,
            shadow: { sizeX: 1.65, sizeY: 0.75, offsetZ: - 0.1, alpha: 0.4 },
            mass: 1.5,
            soundName: 'horn',
            sleep: false
        })
    }

    setTitles()
    {
        // Title
        // this.objects.add({
        //     base: this.resources.items.introBBase.scene,
        //     collision: this.resources.items.introBCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introRBase.scene,
        //     collision: this.resources.items.introRCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introUBase.scene,
        //     collision: this.resources.items.introUCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introNBase.scene,
        //     collision: this.resources.items.introNCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     duplicated: true,
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introOBase.scene,
        //     collision: this.resources.items.introOCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     duplicated: true,
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introSBase.scene,
        //     collision: this.resources.items.introSCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introIBase.scene,
        //     collision: this.resources.items.introICollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introMBase.scene,
        //     collision: this.resources.items.introMCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introOBase.scene,
        //     collision: this.resources.items.introOCollision.scene,
        //     offset: new THREE.Vector3(3.95, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     duplicated: true,
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introNBase.scene,
        //     collision: this.resources.items.introNCollision.scene,
        //     offset: new THREE.Vector3(5.85, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     duplicated: true,
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introCreativeBase.scene,
        //     collision: this.resources.items.introCreativeCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0.25),
        //     shadow: { sizeX: 5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
        //     mass: 1.5,
        //     sleep: false,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introDevBase.scene,
        //     collision: this.resources.items.introDevCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })

        // 重庆化工职业学院文字
        this.objects.add({
            base: this.resources.items.introChongQingBase.scene,
            collision: this.resources.items.introChongQingCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introHuaBase.scene,
            collision: this.resources.items.introHuaCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introGongBase.scene,
            collision: this.resources.items.introGongCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introZhiBase.scene,
            collision: this.resources.items.introZhiCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introYeBase.scene,
            collision: this.resources.items.introYeCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.introXueYuanBase.scene,
            collision: this.resources.items.introXueYuanCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
            mass: 1.5,
            soundName: 'brick'
        })
        this.objects.add({
            base: this.resources.items.intro60Base.scene,
            collision: this.resources.items.intro60Collision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0, 0, 0),
            shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
            mass: 3,
            soundName: 'brick'
        })
    }

    setTiles()
    {
        this.tiles.add({
            start: new THREE.Vector2(0, - 4.5),
            delta: new THREE.Vector2(0, - 4.5)
        })
    }
    setSchoolLogo()
    {
        this.photoPlane = new PhotoPlane(
            './models/intro/school_logo.png',
            8,
            8,
            new THREE.Vector3(0, 10, 0.01)
        )
        this.container.add(this.photoPlane.container)
    }

    setPhotoPlane()
    {
        this.photoPlane = new PhotoPlane(
            './models/intro/playground.png',
            70,
            35,
            new THREE.Vector3(50, 50, 0.01)
        )
        this.container.add(this.photoPlane.container)
    }

    setFootball()
    {
        this.football = {}
        this.football.x = this.x + 55
        this.football.y = this.y + 52

        this.football.pins = this.walls.add({
            object:
            {
                base: this.resources.items.bowlingPinBase.scene,
                collision: this.resources.items.bowlingPinCollision.scene,
                offset: new THREE.Vector3(0, 0, 0.1),
                rotation: new THREE.Euler(0, 0, 0),
                duplicated: true,
                shadow: { sizeX: 1.4, sizeY: 1.4, offsetZ: - 0.15, alpha: 0.35 },
                mass: 0.1,
                soundName: 'bowlingPin'
                // sleep: false
            },
            shape:
            {
                type: 'triangle',
                widthCount: 4,
                position: new THREE.Vector3(this.football.x - 20, this.football.y, 0),
                offsetWidth: new THREE.Vector3(0, 1, 0),
                offsetHeight: new THREE.Vector3(0.65, 0, 0),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0)
            }
        })

        this.football.ball = this.objects.add({
            base: this.resources.items.footballBase.scene,
            collision: this.resources.items.footballCollision.scene,
            offset: new THREE.Vector3(this.football.x - 5, this.football.y, 0),
            rotation: new THREE.Euler(Math.PI * 0.5, 0, 0),
            duplicated: true,
            shadow: { sizeX: 2.5, sizeY: 2.5, offsetZ: - 0.3, alpha: 0.35 },
            mass: 5,
            soundName: 'bowlingBall'
            // sleep: false
        })

        // Reset
        this.football.reset = () =>
        {
            // Reset pins
            for(const _pin of this.football.pins.items)
                {
                    _pin.collision.reset()
                }
            // Reset ball
            this.football.ball.collision.reset()
        }

        // Reset area
        this.football.resetArea = this.areas.add({
            position: new THREE.Vector2(this.football.x-5, this.football.y - 17),
            halfExtents: new THREE.Vector2(2, 2)
        })
        this.football.resetArea.on('interact', () =>
        {
            this.football.reset()
        })

        // Reset label
        this.football.areaLabelMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.5), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, color: 0xffffff, alphaMap: this.resources.items.areaResetTexture }))
        this.football.areaLabelMesh.position.x = this.football.x - 5
        this.football.areaLabelMesh.position.y = this.football.y - 17
        this.football.areaLabelMesh.matrixAutoUpdate = false
        this.football.areaLabelMesh.updateMatrix()
        this.container.add(this.football.areaLabelMesh)

        // Debug
        if(this.debugFolder)
        {
            this.debugFolder.add(this.football, 'reset').name('football reset')
        }
    }

    setDikes()
    {
        this.dikes = {}
        this.dikes.brickOptions = {
            base: this.resources.items.brickBase.scene,
            collision: this.resources.items.brickCollision.scene,
            offset: new THREE.Vector3(0, 0, 0.1),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: { sizeX: 1.2, sizeY: 1.8, offsetZ: - 0.15, alpha: 0.35 },
            mass: 0.5,
            soundName: 'brick'
        }

        // this.walls.add({
        //     object:
        //     {
        //         ...this.dikes.brickOptions,
        //         rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
        //     },
        //     shape:
        //     {
        //         type: 'brick',
        //         equilibrateLastLine: true,
        //         widthCount: 3,
        //         heightCount: 2,
        //         position: new THREE.Vector3(this.x + 0, this.y - 4, 0),
        //         offsetWidth: new THREE.Vector3(1.05, 0, 0),
        //         offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //         randomOffset: new THREE.Vector3(0, 0, 0),
        //         randomRotation: new THREE.Vector3(0, 0, 0.2)
        //     }
        // })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 5,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 12, this.y - 13, 0),
                offsetWidth: new THREE.Vector3(0, 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object:
            {
                ...this.dikes.brickOptions,
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
            },
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x + 8, this.y + 6, 0),
                offsetWidth: new THREE.Vector3(1.05, 0, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: false,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x + 9.9, this.y + 4.7, 0),
                offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object:
            {
                ...this.dikes.brickOptions,
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
            },
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 14, this.y + 2, 0),
                offsetWidth: new THREE.Vector3(1.05, 0, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: false,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 14.8, this.y + 0.7, 0),
                offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 14.8, this.y - 3.5, 0),
                offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        if(!this.config.touch)
        {
            this.walls.add({
                object:
                {
                    ...this.dikes.brickOptions,
                    rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
                },
                shape:
                {
                    type: 'brick',
                    equilibrateLastLine: true,
                    widthCount: 2,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x + 18.5, this.y + 3, 0),
                    offsetWidth: new THREE.Vector3(1.05, 0, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
            })

            this.walls.add({
                object: this.dikes.brickOptions,
                shape:
                {
                    type: 'brick',
                    equilibrateLastLine: false,
                    widthCount: 2,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x + 19.9, this.y + 2.2, 0),
                    offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
            })
        }
    }
}
