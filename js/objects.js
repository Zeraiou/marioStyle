const canvas = document.querySelector('canvas')

canvas.width = 1024
canvas.height = 576

const c = canvas.getContext('2d')

const overlay = document.querySelector('.overlay') 
const messageBox = document.querySelector('.message') 
const lifeDisplay = document.querySelector('.lifeDisplay') 

const keys = {
	KeyA: {
		pressed: false
	},
	KeyD: {
		pressed: false
	},
	KeyW: {
		pressed: false
	},
}

const camera = {
	position: {
		x: 0,
		y: 0,
	},
	offset: {
		x: 0,
		y: 0,
	}
}

const backgroundMovementSpeed = 4
const background = new Sprite({
	position: {
		x: -1,
		y: -1,
	},
	image: {
		imageSrc: './assets/images/background.png',
		frameRate: 1,
		frameBuffer: 1,
	},
	scale: 1,
	offset: {
		x: 0,
		y: 0,
	},
	movementFromBeggining: 0
})

const hillsMovementSpeed = 1
const hills = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	image: {
		imageSrc: './assets/images/hills.png',
		frameRate: 1,
		frameBuffer: 1,
	},
	scale: 1,
	offset: {
		x: 0,
		y: 0,
	},
	movementFromBeggining: 0
})

const winningPoint = 3690

const floorPlatforms = []

level1.floor.forEach(floor => {
	floorPlatforms.push(new FloorPlatform({
		position: {
			x: floor.x,
			y: floor.y
		},
		image: {
			imageSrc: './assets/images/platform.png',
			frameRate: 1,
			frameBuffer: 1,
		},
		scale: 1,
		offset: {
			x: 0,
			y: 0,
		}
	}))
})

const tallPlatforms = []

level1.tallPlatform.forEach(platform => {
	tallPlatforms.push(new FloorPlatform({
		position: {
			x: platform.x,
			y: platform.y
		},
		image: {
			imageSrc: './assets/images/platformSmallTall.png',
			frameRate: 1,
			frameBuffer: 1,
		},
		scale: 1,
		offset: {
			x: 0,
			y: 0,
		}
	}))
})

const player = new Player({
	position: {
		x: 50,
		y: 290,
	},
	image: {
		imageSrc: './assets/images/spriteStandRight.png',
		frameRate: 60,
		frameBuffer: 1,
	},
	animations: {
		idleRight: {
			image: {
				imageSrc: './assets/images/spriteStandRight.png',
				frameRate: 60,
				frameBuffer: 1,
			},
		},
		idleLeft: {
			image: {
				imageSrc: './assets/images/spriteStandLeft.png',
				frameRate: 60,
				frameBuffer: 1,
			},
		},
		runRight: {
			image: {
				imageSrc: './assets/images/spriteRunRight.png',
				frameRate: 30,
				frameBuffer: 2,
			},
		},
		runLeft: {
			image: {
				imageSrc: './assets/images/spriteRunLeft.png',
				frameRate: 30,
				frameBuffer: 2,
			},
		},
	},
	hitbox: {
		offset: {
			x: 0,
			y: 0,
		},
		width: 15,
		height: 50,
	},
	scale: 0.4,
	offset: {
		x: 0,
		y: 0,
	}, 
	floorPlatforms: floorPlatforms,
	tallPlatforms: tallPlatforms,
})