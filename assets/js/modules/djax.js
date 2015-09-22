var djax = (function() {

    var wait = false,
        transitionedOut = true,
        loadingTimeout;

    /**
     *
     */
    function init() {
        console.log('djax:init');

        // if (typeof $body.data('ajaxloading') == "undefined") {
        //     return;
        // }

        var ignored_links = ['.pdf', '.doc', '.eps', '.png', '.zip', 'admin', 'wp-', 'wp-admin', 'feed', '#', '?lang=', '&lang=', '&add-to-cart=', '?add-to-cart=', '?remove_item'];

        // djax_ignored_links is localized in /inc/functions/callbacks/woocommerce.php
        // if there are localized ignored links, add them
        if ( typeof djax_ignored_links === "object" ) {
            ignored_links = ignored_links.concat( djax_ignored_links );
        }

        if ( typeof user_ignored_links === "object" ) {
            ignored_links = ignored_links.concat( user_ignored_links );
        }

        $('body').djax('.djax-updatable', ignored_links, djaxTransition);

        $(window).on('djaxLoading', onDjaxLoading);
        $(window).on('djaxLoad', onDjaxLoad);
    }

    function djaxTransition($new) {
        var $old = this;
        $('html, body, *').unbind('mousewheel', vertToHorScroll);

        if (transitionedOut) {
            console.log('djax:transition');
            $old.replaceWith($new);
        } else {
            $window.one('djax:transitionOutEnd', function() {
                console.log('djax:transition');
                $old.replaceWith($new);
            });
        }
    }

    function onDjaxLoading(e) {
        console.log('djax:loading');
        wait = true;

        loadingTimeout = setTimeout(function() {
            if (!wait) {
                transitionIn();
            }
            wait = false;
        }, 900);

        Nav.close();
        Overlay.close();

        transitionOut();

        Project.destroy();
    }

    function transitionOut() {
        console.log('djax:transitionOut');
        transitionedOut = false;

        requestAnimationFrame(function() {
            TweenMax.fromTo('.loader', .6, {
                left: '100%'
            }, {
                left: 0,
                ease: Expo.easeInOut
            });
            TweenMax.to('.mask--page', .6, {
                left: 0,
                ease: Expo.easeInOut,
                onComplete: function() {
                    $window.trigger('djax:transitionOutEnd');
                    transitionedOut = true;
                }
            });
        });
    }

    function transitionIn() {
        console.log('djax:transitionIn');
        requestAnimationFrame(function() {
            TweenMax.to('.loader', .3, {
                opacity: 0,
                ease: Expo.easeInOut
            });
            TweenMax.fromTo('.loader', .6, {
                left: 0
            }, {
                left: '-100%',
                ease: Expo.easeInOut
            });
            TweenMax.to('.mask--page', .6, {
                left: '100%',
                ease: Expo.easeInOut,
                onComplete: function() {
                    $('.mask--page').css('left', '-100%');
                    $('.loader').css('opacity', 1);
                }
            });
        });
    }

    function onDjaxLoad(e, data) {
        console.log('djax:load');
        // get data and replace the body tag with a nobody tag
        // because jquery strips the body tag when creating objects from data
        data = data.response.replace(/(<\/?)body( .+?)?>/gi, '$1NOTBODY$2>', data);
        // get the nobody tag's classes
        var nobodyClass = $(data).filter('notbody').attr("class");
        // set it to current body tag

        // Change the toolbar edit button accordingly
        // need to get the id and edit string from the data attributes
        var curPostID = $(data).filter('notbody').data("curpostid"),
          curPostTax = $(data).filter('notbody').data("curtaxonomy"),
          curPostEditString = $(data).filter('notbody').data("curpostedit");

        function finishTransition() {
            $(window).scrollLeft(0);
            $(window).scrollTop(0);
            $body.attr('class', nobodyClass);
            adminBarEditFix(curPostID, curPostEditString, curPostTax);
            softInit();
            $('body').trigger('post-load');
        }

        if (transitionedOut) {
            finishTransition();
        } else {
            $window.one('djax:transitionOutEnd', finishTransition);
        }

        //lets do some Google Analytics Tracking, in case it is there
        if (window._gaq) {
            _gaq.push(['_trackPageview']);
        }

        if (!wait) {
            transitionIn();
        }

        wait = false;
    }

    // here we change the link of the Edit button in the Admin Bar
    // to make sure it reflects the current page
    function adminBarEditFix(id, editString, taxonomy) {
        //get the admin ajax url and clean it
        var baseEditURL = timber_ajax.ajax_url.replace('admin-ajax.php','post.php'),
          baseExitTaxURL = timber_ajax.ajax_url.replace('admin-ajax.php','edit-tags.php'),
          $editButton = $('#wp-admin-bar-edit a');

        if ( !empty($editButton) ) {
            if ( id !== undefined && editString !== undefined ) { //modify the current Edit button
                if (!empty(taxonomy)) { //it seems we need to edit a taxonomy
                    $editButton.attr('href', baseExitTaxURL + '?tag_ID=' + id + '&taxonomy=' + taxonomy + '&action=edit');
                } else {
                    $editButton.attr('href', baseEditURL + '?post=' + id + '&action=edit');
                }
                $editButton.html(editString);
            } else { //we have found an edit button but right now we don't need it anymore since we have no id
                $('#wp-admin-bar-edit').remove();
            }
        } else { //upss ... no edit button
            //lets see if we need one
            if ( id !== undefined && editString !== undefined ) { //we do need one after all
                //locate the New button because we need to add stuff after it
                var $newButton = $('#wp-admin-bar-new-content');

                if (!empty($newButton)) {
                    if (!empty(taxonomy)) { //it seems we need to generate a taxonomy edit thingy
                        $newButton.after('<li id="wp-admin-bar-edit"><a class="ab-item dJAX_internal" href="' + baseExitTaxURL + '?tag_ID=' + id + '&taxonomy=' + taxonomy + '&action=edit">' + editString + '</a></li>');
                    } else { //just a regular edit
                        $newButton.after('<li id="wp-admin-bar-edit"><a class="ab-item dJAX_internal" href="' + baseEditURL + '?post=' + id + '&action=edit">' + editString + '</a></li>');
                    }
                }
            }
        }
    }

    return {
        init: init,
        transition: djaxTransition
    }

})();