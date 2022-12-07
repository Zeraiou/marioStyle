class Sprite {
	constructor({ position, image, scale, offset }) {
		this.position = position
		this.scale = scale
		this.image = new Image()
		this.image.onload = () => {
			this.width = (this.image.width / this.frameRate) * this.scale
			this.height = this.image.height * this.scale
			this.loaded = true
		}
		this.image.src = image.imageSrc
		this.frameRate = image.frameRate
		this.frameBuffer = image.frameBuffer

		this.currentFrame = 0
		this.elapsedFrame = 0

		this.loaded = false
		this.offset = offset
	}

	draw() {
		if (!this.loaded) return

		const cropbox = {
			x: this.currentFrame * this.image.width / this.frameRate,
			y: 0,
			width: this.image.width / this.frameRate,
			height: this.image.height,
		}
		c.drawImage(
			this.image,
			cropbox.x,
			cropbox.y,
			cropbox.width,
			cropbox.height,
			this.position.x + this.offset.x,
			this.position.y + this.offset.y,
			this.width,
			this.height
		)
	}

	updateFrames() {
		this.draw()

		if (this.frameRate === 1) return

		this.elapsedFrame++
		if (this.elapsedFrame >= this.frameBuffer) {
			this.elapsedFrame = 0
			this.currentFrame++

			if (this.currentFrame === this.frameRate) this.currentFrame = 0
		}	
	}
} 
