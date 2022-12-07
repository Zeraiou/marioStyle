class Player extends Sprite {
	constructor({ position, image, hitbox, animations, scale, offset, floorPlatforms, tallPlatforms }) {
		super({ position, image, scale, offset })
		this.velocity = {
			x: 0,
			y: 0,
		}

		this.gravity = 0.5
		this.jumpingDistance = -13
		this.movementSpeed = 6
		this.canMove = true

		this.onGround = false

		this.animations = animations
		this.currentAnimation = this.animations.idleRight

		this.lastDirection = "right"

		this.cameraBox = {
			position: {
				x: this.position.x + this.offset.x,
				y: this.position.y + this.offset.y,
			}, 
			width: 400,
			height: 400,
			offset: {
				x: -200,
				y: -100,
			}
		}

		this.floorPlatforms = floorPlatforms
		this.tallPlatforms = tallPlatforms
		
		this.life = 3
		this.initLifeDisplay()
	}

	initLifeDisplay() {
		lifeDisplay.innerHTML = "Life: " + this.life
	}

	update() {
		console.log(this.position.x)
		// this.drawFullImage()
		this.updateCameraBox()
		// this.drawCameraBox()
		super.updateFrames()
		
		if (this.gameFinished) return
		if (this.canMove) this.move()	
		//this.detectHorizontalCollisionWithFloorPlatforms()

		if (this.canMove) this.applyGravity()
		if (this.onGround && this.canMove) this.jump()
		this.detectCollisionWithFloorPlatforms()
		this.detectCollisionWithTallPlatforms()

	
		this.checkCollisionWithLeftWall()
		this.checkCollisionWithBottom()

		this.determineSprite()
	}

	drawFullImage() {
		c.fillStyle = "rgba(0, 0, 210, 0.3)"
		c.fillRect(this.position.x + this.offset.x, this.position.y + this.offset.y, this.width, this.height)
	}

	updateCameraBox() {
		this.cameraBox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			}, 
			width: 600,
			height: 400,
			offset: {
				x: -260,
				y: -100,
			}
		}
	}

	drawCameraBox() {
		c.fillStyle = "rgba(0, 210, 0, 0.3)"
		c.fillRect(this.cameraBox.position.x + this.cameraBox.offset.x, this.cameraBox.position.y + this.cameraBox.offset.y, this.cameraBox.width, this.cameraBox.height)
	}

	applyGravity() {
		this.velocity.y += this.gravity
		this.position.y += this.velocity.y

		// if (this.velocity.y > 0.5) this.onGround = false
	}

	jump() {
		if (keys.KeyW.pressed) {
			this.velocity.y = this.jumpingDistance
			this.position.y += this.velocity.y
			this.onGround = false
		}
	}

	move() {
		this.velocity.x = 0

		if (keys.KeyA.pressed) {
			this.velocity.x = -this.movementSpeed
			this.lastDirection = "left"
			
			this.cameraReachLeftSide()
		}
		else if (keys.KeyD.pressed) {
			this.velocity.x = this.movementSpeed
			this.lastDirection = "right"
			
			this.cameraReachRightSide()
		}

		this.position.x += this.velocity.x
	}

	cameraReachRightSide() {
		const rightSideCamera = this.cameraBox.position.x + this.cameraBox.offset.x + this.cameraBox.width

		if (rightSideCamera >= canvas.width + camera.offset.x) {
			camera.position.x -= this.movementSpeed
			camera.offset.x += this.movementSpeed

			if (background.position.x < winningPoint + 700) {
				background.position.x -= backgroundMovementSpeed
			}	
			if (hills.position.x < winningPoint + 700) {
				hills.position.x -= hillsMovementSpeed
			}
		}
	}

	cameraReachLeftSide() {
		const leftSideCamera = this.cameraBox.position.x + this.cameraBox.offset.x

		if (leftSideCamera <= camera.offset.x &&
				leftSideCamera > 0 ) {
			camera.position.x += this.movementSpeed
			camera.offset.x -= this.movementSpeed

			if (background.position.x < -backgroundMovementSpeed) {
				background.position.x += backgroundMovementSpeed
			}	
			if (hills.position.x < -hillsMovementSpeed) {
				hills.position.x += hillsMovementSpeed
			}
		}
	}

	detectCollisionWithFloorPlatforms() {
		for (let i = 0; i < this.floorPlatforms.length; i++) {
			const platform = this.floorPlatforms[i]

			if (detectRectangularCollision(this, platform))	{
				if (this.position.y + this.height - (this.velocity.y * 2) <= platform.position.y) {
					this.velocity.y = 0
					this.onGround = true
					this.position.y = platform.position.y - this.height - 0.01
				}
				// else if (this.velocity.y < 0) {
				// 	this.velocity.y = 0
				// 	this.position.y = platform.position.y + platform.height + 0.01
				// }
			}
		}
	}	
	detectCollisionWithTallPlatforms() {
		for (let i = 0; i < this.tallPlatforms.length; i++) {
			const platform = this.tallPlatforms[i]

			if (detectRectangularCollision(this, platform))	{
				if (this.position.y + this.height - (this.velocity.y * 2) <= platform.position.y) {
					this.velocity.y = 0
					this.onGround = true
					this.position.y = platform.position.y - this.height - 0.01
				}
			}
		}
	}

	detectHorizontalCollisionWithFloorPlatforms() {
		for (let i = 0; i < this.floorPlatforms.length; i++) {
			const platform = this.floorPlatforms[i]

			if (detectRectangularCollision(this, platform))	{
				if (this.velocity.x > 0) {
					this.position.x = platform.position.x - this.width - 0.01
				}
				else if (this.velocity.x < 0) {
					this.position.x = platform.position.x + platform.width + 0.01
				}
			}
		}
	}

	checkCollisionWithBottom() {
		if (this.position.y >= canvas.height + 10) {
			this.canMove = false
			this.resetLevel()
		}
	}

	resetLevel() {
		if (this.life > 0) {
			this.life--
			lifeDisplay.innerHTML = "Life: " + this.life
		}
		
		if (this.life <= 0) this.gameOver()
		else {
			this.position.y = 290
			this.position.x = 50
			this.onGround = false
			camera.position = {
				x: 0,
				y: 0,
			}
			camera.offset = {
				x: 0,
				y: 0,
			}

			background.position.x = -1
			hills.position.x = 0
			
			this.velocity = {
				x: 0,
				y: 0,
			}

			this.switchSprite(this.animations.idleRight)
			this.currentFrame = 0
			this.elapsedFrame = 0
			this.lastDirection = "right"

			this.canMove = true
			this.gameFinished = false
		}
	}

	gameOver() {
		overlay.style.visibility = "visible"
		messageBox.style.visibility = "visible"
		messageBox.innerHTML = "GAME OVER"
	}

	checkCollisionWithLeftWall() {
		if (this.position.x <= 15) {
			this.position.x = 15 
		}
	}

	determineSprite() {
		if (this.velocity.x < 0) {
			this.switchSprite(this.animations.runLeft)
			this.offset.x = -25.4
		}
		else if (this.velocity.x > 0) {
			this.switchSprite(this.animations.runRight)
			this.offset.x = -40
		}
		else if (this.lastDirection === "left") {
			this.switchSprite(this.animations.idleLeft)
			this.offset.x = 0
		}
		else {
			this.switchSprite(this.animations.idleRight)
			this.offset.x = 0
		}
	}

	switchSprite(animation) {
		if (this.currentAnimation === animation) return

		this.currentAnimation = animation
		this.loaded = false
		this.image.onload = () => {
			this.width = (this.image.width / this.frameRate) * this.scale
			this.height = this.image.height * this.scale
			this.loaded = true
		}
		this.image.src = animation.image.imageSrc
		this.frameRate = animation.image.frameRate
		this.frameBuffer = animation.image.frameBuffer

		this.currentFrame = 0
		this.elapsedFrame = 0
	}
}