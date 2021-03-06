/**
 * Visor
 * Class representing the Visor
 * @class
 */
class Visor {
	/**
	 * Constructor for Visor class
	 * @constructor
	 * @param {*} texture
	 * @param {*} lockedTexture
	 */
	constructor(texture, lockedTexture) {
		this.material = new THREE.SpriteMaterial(
			{	map: texture
			,	color: 0xffffff
			,	transparent: true
			,	depthWrite: false
			});
		this.sprite = new THREE.Sprite(this.material);
		this.sprite.position.z = -10;
		this.position = this.sprite.position;

		this.lockedMaterial = new THREE.SpriteMaterial(
			{	map: lockedTexture
			,	color: 0xffffff
			,	transparent: true
			,	depthWrite: false
			});
		this.lockedSprite = new THREE.Sprite(this.lockedMaterial);
		this.lockedSprite.position.z = -10;
		this.lockedSprite.visible = false;
		//this.lockedSprite.scale.multiplyScalar(1);

		this.star = undefined;
		this.constellation = undefined;
	}

	/**
	 * Adds the Visor object to the given Scene
	 * @param {Scene} scene Scene object from Three.js library. The Visor object
	 * will be added to this Scene
	 */
	addToScene(scene) {
		scene.add(this.sprite);
		scene.add(this.lockedSprite);
	}

	/**
	 * Setter for the current target of the Visor object
	 * @param {Star} star Target Star object
	 */
	setTarget(star) {
		this.previousStar = this.star;
		this.star = star;
		this.position.copy(
			SkySphere.raDecToCartesian(10, this.star.ra, this.star.dec)
		);
		this.show();
	}

	setLocked(star) {
		this.lockedSprite.position.copy(SkySphere.raDecToCartesian(10, star.ra, star.dec));
		this.lockedSprite.visible = true;

		if (this.constellation !== undefined) {
			for (let i = 0; i < this.constellation.links.length; i++) {
				let link = this.constellation.links[i];
				link.line.material.color = new THREE.Color(0x555555);
				link.line.material.linewidth = 2;
			}
			this.constellation = undefined;
		}
	}

	setConstellation(constellation) {
		this.constellation = constellation;
		this.star = undefined;
		for (let i = 0; i < constellation.links.length; i++) {
			let link = constellation.links[i];
			link.line.material.color = new THREE.Color(0x666666);
			link.line.material.linewidth = 5;
		}
	}

	show() {
		this.sprite.visible = true;
	}

	hide() {
		this.sprite.visible = false;
	}

	isVisible() {
		return this.sprite.visible;
	}
}
