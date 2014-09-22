/*
 * Framework7 3D Panels 0.9.1
 * Framework7 plugin to add 3d effect for side panels
 *
 * http://www.idangero.us/framework7/
 *
 * Copyright 2014, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: August 15, 2014
*/
Framework7.prototype.plugins.panels3d = function (app, params) {
    'use strict';

    var $ = window.Dom7;
    var leftPanelWidth, rightPanelWidth, leftPanel, rightPanel, views;

    function leftPanelOpen() {
        views.css({
            '-webkit-transform-origin': '100% center',
            'transform-origin': '100% center',
        });
    }

    function rightPanelOpen() {
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