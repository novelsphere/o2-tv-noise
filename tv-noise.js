/* global o2 Layer renderer Rect Tag TagAction config */
(function() {

	var NoiseLayer = function() {
		Layer.apply(this, arguments);
		this.running = false;
		this.opacity = 0.5;
		this.index = Math.max.apply(Math, o2.allForeLayers().map(function(layer) {
			return layer.index;
		})) + 1;


		this.noiseCanvas = document.createElement('canvas');
		this.noiseCanvas.width = this.rect.width;
		this.noiseCanvas.height = this.rect.height;
		this.noiseCtx = this.noiseCanvas.getContext('2d');

		this.setColor("#ffffff");
	};
	NoiseLayer.prototype = Object.create(Layer.prototype);
	NoiseLayer.prototype.setColor = function(color) {
		this.color = color;
		this.ctx.fillStyle = this.color;
	};
	NoiseLayer.prototype.startNoise = function() {
		if (this.running) return;
		this.running = true;
		this.applyNoise();
	};
	NoiseLayer.prototype.stopNoise = function() {
		if (!this.running) return;
		this.running = false;
	};
	NoiseLayer.prototype.applyNoise = function() {
		var _this = this;
		if (!this.running) {
			renderer.animator.requestFrame(function() {
				_this.ctx.clearRect(0, 0, _this.rect.width, _this.rect.height);
			});
			return;
		}

		var w = this.rect.width,
			h = this.rect.height,
			idata = this.noiseCtx.createImageData(w, h),     // create image data
			buffer32 = new Uint32Array(idata.data.buffer),   // get 32-bit buffer
			len = buffer32.length,
			i = 0;

		for (; i < len;)
			buffer32[i++] = ((255 * Math.random()) | 0) << 24; // alter alpha channel

		this.noiseCtx.putImageData(idata, 0, 0);

		this.ctx.fillRect(0, 0, this.rect.width, this.rect.height);
		this.ctx.drawImage(this.noiseCanvas, 0, 0, this.rect.width, this.rect.height);

		renderer.animator.requestFrame(function() {
			_this.applyNoise();
		});
	};

	var noiseLayer = new NoiseLayer(new Rect({
		x : 0,
		y : 0,
		width : config.scWidth,
		height : config.scHeight
	}));

	// レイヤを追加する
	var enabled = false,
		_fore = o2.allForeLayers,
		_back = o2.allBackLayers;

	o2.allForeLayers = function() {
		var original = _fore.apply(this, arguments);
		if (!enabled) return original;

		original = original.concat(noiseLayer);
		return original;
	};
	o2.allBackLayers = function() {
		var original = _back.apply(this, arguments);
		if (!enabled) return original;

		original = original.concat(noiseLayer);
		return original;
	};

	/**
	 *
	 * above = message1
	 * indexはaboveより優先される
	 */
	Tag.actions.tvnoise = new TagAction({
		rules : {
			enable : {type:"BOOLEAN"},
			above : {type:"LAYER"},
			index : {type:"INT"},
			opacity : {type:"FLOAT"},  // 0 ~ 255
			color : {type:"COLOR"}
		},
		action : function(args) {

			if ('enable' in args && args.enable != enabled) {
				enabled = args.enable;
				if (enabled) {
					noiseLayer.startNoise();
					o2.refreshRendererLayers();
				} else {
					noiseLayer.stopNoise();
				}
			}

			if ('index' in args) {
				noiseLayer.index = args.index;
				o2.refreshRendererLayers();
			} else if ('above' in args) {
				noiseLayer.index = args.above.fore.index + 1;
				o2.refreshRendererLayers();
			}

			if ('opacity' in args) {
				noiseLayer.opacity = args.opacity / 255;
			}

			if ('color' in args) {
				noiseLayer.setColor(args.color);
			}

			return 0;
		}
	});
})();