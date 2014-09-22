/*
Based on tutorial at: https://github.com/sebleedelisle/Tutorials/tree/master/three

Copyright (c)2010-2011, Seb Lee-Delisle, sebleedelisle.com
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

	// the main three.js components
	var camera, scene, renderer,

	// an array to store our particles in
		particles = [];

	// let's get going! 
	// Go
	init();

	function init() {

		// Camera params : 
		// field of view, aspect ratio for render output, near and far clipping plane. 
		camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000 );

		// move the camera backwards so we can see stuff! 
		// default position is 0,0,0. 
		camera.position.z = 1000;

		// the scene contains all the 3D object data
		scene = new THREE.Scene();
		
		// camera needs to go in the scene 
		scene.add(camera);

		// and the CanvasRenderer figures out what the 
		// stuff in the scene looks like and draws it!

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		THREEx.WindowResize(renderer, camera);

		// the renderer's canvas domElement is added to the body
		document.getElementById('content').appendChild( renderer.domElement );

		makeParticles(); 
		
		update();
	
	}

	// the main update function, called 30 times a second

	function update() {

		updateParticles();

		// and render the scene from the perspective of the camera
		renderer.render( scene, camera );

		requestAnimationFrame(update); 
	}

	// creates a random field of Particle objects
	
	function makeParticles() { 
		
		var particle, material; 

		// we're gonna move from z position -1000 (far away) 
		// to 1000 (where the camera is) and add a random particle at every pos. 
		for ( var zpos= -1000; zpos < 1000; zpos+=20 ) {

			var pMaterial = new THREE.ParticleBasicMaterial({
			  color: 0xFFFFFF,
			  size: 1,
			  map: THREE.ImageUtils.loadTexture(
			    "images/star.png"
			  ),
			  blending: THREE.AdditiveBlending,
			  transparent: true
			});
			// we make a particle material and pass through the 
			// colour and custom particle render function we defined. 
			particle = new THREE.Particle(pMaterial);

			// give it a random x and y position between -500 and 500
			particle.position.x = Math.random() * 1000 - 500;
			particle.position.y = Math.random() * 1000 - 500;

			// set its z position
			particle.position.z = zpos;

			// scale it up a bit
			//particle.scale.x = particle.scale.y = 2;

			// add it to the scene
			scene.add( particle );

			// and to the array of particles. 
			particles.push(particle); 
		}
		
	}
	

	
	// moves all the particles dependent on mouse position
	
	function updateParticles() { 
		
		// iterate through every particle
		for(var i=0; i<particles.length; i++) {

			particle = particles[i]; 

			particle.position.z +=  0.5;

			// if the particle is too close move it to the back
			if(particle.position.z>1000) particle.position.z-=2000; 

		}

	}