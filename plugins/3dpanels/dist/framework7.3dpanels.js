/**
 * Framework7 3D Panels 1.0.0
 * Framework7 plugin to add 3d effect for side panels
 * 
 * http://www.idangero.us/framework7/plugins/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: August 22, 2015
 */
Framework7.prototype.plugins.panels3d = function (app, params) {
    'use strict';
    params = params || {enabled: true};
    var $ = window.Dom7;

    app.panels3d = {
        enable: function () {
            $('body').addClass('panels-3d');
            params.enabled = true;
        },
        disable: function () {
            $('body').removeClass('panels-3d');
            params.enabled = false;
        },
    };
    if (params.enabled) $('body').addClass('panels-3d');
    
    var leftPanelWidth, rightPanelWidth, leftPanel, rightPanel, views;

    function leftPanelOpen() {
        if (!params.enabled) return;
        views.css({
            '-webkit-transform-origin': '100% center',
            'transform-origin': '100% center',
        });
    }

    function rightPanelOpen() {
        if (!params.enabled) return;
        views.css({
            '-webkit-transform-origin': '0% center',
            'transform-origin': '0% center',
        });
    }


    function appInit() {
        views = $('.views');
        leftPanel = $('.panel-left.panel-reveal');
        rightPanel = $('.panel-right.panel-reveal');

        leftPanel.on('open', leftPanelOpen);
        rightPanel.on('open', rightPanelOpen);
    }

    function setPanelTransform(viewsContainer, panel, perc) {
        if (!params.enabled) return;
        panel = $(panel);
        if (!panel.hasClass('panel-reveal')) return;

        if (panel.hasClass('panel-left')) {
            if (!leftPanelWidth) leftPanelWidth = panel[0].offsetWidth;
            views.transform('translate3d(' + (leftPanelWidth * perc) + 'px,0,0) rotateY(' + (-30 * perc) + 'deg)');
            views.css({
                '-webkit-transform-origin': '100% center',
                'transform-origin': '100% center',
            });
            panel.transform('translate3d(' + (-leftPanelWidth * (1 - perc)) + 'px,0,0)');
        }
        if (panel.hasClass('panel-right')) {
            if (!rightPanelWidth) rightPanelWidth = panel[0].offsetWidth;
            views.transform('translate3d(' + (-rightPanelWidth * perc) + 'px,0,0) rotateY(' + (30 * perc) + 'deg)');
            views.css({
                '-webkit-transform-origin': '0% center',
                'transform-origin': '0% center',
            });
            panel.transform('translate3d(' + (rightPanelWidth * (1 - perc)) + 'px,0,0)');
        }
    }
    return {
        hooks : {
            appInit: appInit,
            swipePanelSetTransform: setPanelTransform,
        }
    };
};