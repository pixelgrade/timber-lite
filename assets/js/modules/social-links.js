var scl,
	socialLinks = {
		settings: {
			wrapper: $('.share-box'),
			button: $('.js-share-button'),
			text: $('.share-text'),
			social_links: $('.share-box a'),
			social_links_list: $('.social-links-list'),
			anim: new TimelineMax({paused:true, onComplete:function(){
				$('.social-links-list').addClass('is-active');
			}, onReverseComplete:function(){
				$('.social-links-list').removeClass('is-active');
			}})
		},

		init: function() {
			if (globalDebug) {console.log("Social Links Hover - INIT");}

			scl = this.settings;
			this.update();

			if (!empty(scl.wrapper)) {
				//the actual animation
				scl.anim
					//.to(scl.button, 0.2, {backgroundColor:"#1a1717"})
					//.to(scl.social_links_list, 0.2, {opacity: 1})
					.to(scl.button, 0.02, {opacity: 0, ease: Quart.easeOut })
					.to(scl.text, 0.02, {opacity: 1,  ease: Circ.easeOut })
					.staggerFromTo(scl.social_links, 0.3, {opacity: 0, x: -20}, {opacity: 1, x: 0, ease: Circ.easeOut, onComplete: function(){
						$('.social-links-list').addClass('clickable');
					},
					onReverseComplete: function(){
						$('.social-links-list').removeClass('clickable');
					}}, 0.025, "-=0.02");

				//toggle play and reverse timeline on hover
				//scl.wrapper.hover(this.over, this.out);
				scl.button.on('mouseenter', this.over);
				scl.wrapper.on('mouseleave', this.out);

			} else {
				if (globalDebug) {console.log("Social Links Hover - SHOW STOPPER - No social links wrapper found");}
			}
		},

		update: function() {
			if (globalDebug) {console.log("Social Links Hover - UPDATE");}

			scl.wrapper = $('.share-box');
			scl.button = $('.js-share-button');
			scl.social_links = $('.share-box a');
			scl.social_links_list = $('.social-links-list');
			scl.anim = new TimelineLite({paused:true, onComplete:function(){
				scl.social_links_list.addClass('is-active');
			}, onReverseComplete:function(){
				scl.social_links_list.removeClass('is-active');
			}});
		},

		over: function() {
			if (globalDebug) {console.log("Social Links Hover - OVER");}

			scl.anim.play();

			console.log('over');
		},

		out: function() {
			if (globalDebug) {console.log("Social Links Hover - OUT");}

			scl.anim.reverse();
		}
	};