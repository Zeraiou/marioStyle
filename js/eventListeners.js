window.addEventListener("keydown", (event) => {
	switch(event.code) {
		case "KeyA":
			keys.KeyA.pressed = true
			break

		case "KeyD":
			keys.KeyD.pressed = true
			break

		case "KeyW":
			keys.KeyW.pressed = true
			break

		case "Enter":
			if (player.life <= 0) {
				player.life = 3
				player.resetLevel()
				overlay.style.visibility = "hidden"
				messageBox.innerHTML = ""
				messageBox.style.visibility = "hidden"
			}
			break

		default: break
	}
})

window.addEventListener("keyup", (event) => {
	switch(event.code) {
		case "KeyA":
			keys.KeyA.pressed = false
			break

		case "KeyD":
			keys.KeyD.pressed = false
			break

		case "KeyW":
			keys.KeyW.pressed = false
			break

		default: break
	}
})