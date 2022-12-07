let gameInterval = null


function animate() {
	gameInterval = window.requestAnimationFrame(animate)

	c.fillStyle = "white"
	c.fillRect(0, 0, canvas.width, canvas.height)

	c.save()
	c.translate(camera.position.x, camera.position.y)
	background.draw()
	hills.draw()
	tallPlatforms.forEach(platform => {
		platform.draw()
	})
	floorPlatforms.forEach(platform => {
		platform.draw()
	})
	player.update()
	c.restore()

	detectWinningCondition()
}

function detectWinningCondition() {
	if (player.position.x + player.width >= winningPoint) {
		player.canMove = false
		player.gameFinished = true
		player.switchSprite(player.animations.idleRight)
		player.offset.x = 0
		overlay.style.visibility = "visible"
		messageBox.style.visibility = "visible"
		messageBox.innerHTML = "Level Finished!!!"
	}
}

animate()