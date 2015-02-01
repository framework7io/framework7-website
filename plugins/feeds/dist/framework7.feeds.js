/*
 * Framework7 Feeds 1.0.0
 * Framework7 Feeds plugin brings easy RSS feeds integration into Framework7 app
 *
 * http://www.idangero.us/framework7/
 *
 * Copyright 2014, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: December 9, 2014
*/
Framework7.prototype.plugins.feeds = function (app) {
    'use strict';
    var $ = window.Dom7;
    var t7 = window.Template7;

    var Feeds = function (container, params) {
        var f = this;
        var defaults = {
            openIn: 'page',
            formatDate: function (date) {
                date = new Date(date);
                var months = ('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec').split(' ');
                return months[date.getMonth(date)] + ' ' + date.getDate(date) + ', ' + date.getFullYear();
            }
        };
        params = params || {};
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
        }
        f.params = params;
        f.data = {};
        f.container = $(container);

        // Templates
        var listTemplate = 
            '<ul>' +
                '{{#each items}}' +
                    '<li>' +
                        '<a href="#" class="item-link item-content feeds-item-link" data-index="{{@index}}">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{title}}</div>' +
                                '<div class="item-after">{{formattedDate}}</div>' +
                            '</div>' +
                        '</a>' +
                    '</li>' +
                '{{/each}}' +
            '</ul>';
        var virtualListItemTemplate = 
            '<li>' +
                '<a href="#" class="item-link item-content feeds-item-link" data-index="{{@index}}">' +
                    '<div class="item-inner">' +
                        '<div class="item-title">{{title}}</div>' +
                        '<div class="item-after">{{formattedDate}}</div>' +
                    '</div>' +
                '</a>' +
            '</li>';
        var itemPageNavbarTemplate = 
            '<div class="navbar">' +
                '<div class="navbar-inner">' +
                    '<div class="left sliding">' +
                        '<a href="#" class="back link">' +
                            '<i class="icon icon-back"></i>' +
                            '<span>Back</span>' +
                        '</a>' +
                    '</div>' +
                    '<div class="center sliding">{{title}}</div>' +
                '</div>' +
            '</div>';

        var navbarLayout = 'static';
        if (f.container.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
        if (f.container.parents('.navbar-through').length > 0) navbarLayout = 'through';
        var itemPageTemplate = 
        (navbarLayout === 'through' ? itemPageNavbarTemplate : '') +
        '<div class="page feeds-page ' + (navbarLayout === 'fixed' ? 'navbar-fixed' : '') + '" data-page="feeds-page-{{index}}">' +
            (navbarLayout === 'fixed' ? itemPageNavbarTemplate : '') +
            '<div class="page-content">' +
                (navbarLayout === 'static' ? itemPageNavbarTemplate : '') +
                '<div class="content-block">' +
                    '<a href="{{link}}" class="external" target="_blank">{{title}}</a><br>' +
                    '<small>{{formattedDate}}</small>' +
                '</div>' +
                '<div class="content-block"><div class="content-block-inner">{{description}}</div></div>' +
            '</div>' +
        '</div>';
        var itemPopupTemplate = 
        '<div class="popup">' +
            '<div class="view navbar-fixed">' +
                '<div class="navbar">' +
                    '<div class="navbar-inner">' +
                        '<div class="left sliding">' +
                            '<a href="#" class="close-popup link">' +
                                '<i class="icon icon-back"></i>' +
                                '<span>Close</span>' +
                            '</a>' +
                        '</div>' +
                        '<div class="center sliding">{{title}}</div>' +
                    '</div>' +
                '</div>' +
                '<div class="pages">' +
                    '<div class="page feeds-page" data-page="feeds-page-{{index}}">' +
                        '<div class="page-content">' +
                            '<div class="content-block">' +
                                '<a href="{{link}}" class="external" target="_blank">{{title}}</a><br>' +
                                '<small>{{formattedDate}}</small>' +
                            '</div>' +
                            '<div class="content-block"><div class="content-block-inner">{{description}}</div></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

        // List template
        if (f.params.listTemplate) {
            if (typeof f.params.listTemplate === 'function') f.listTemplate = f.params.listTemplate;
            else if (typeof f.params.listTemplate === 'string') f.listTemplate = t7.compile(f.params.listTemplate);
        }
        else {
            f.listTemplate = t7.compile(listTemplate);
        }
        // Item Template
        if (f.params.itemPageTemplate) {
            if (typeof f.params.itemPageTemplate === 'function') f.itemPageTemplate = f.params.itemPageTemplate;
            else if (typeof f.params.itemPageTemplate === 'string') f.itemPageTemplate = t7.compile(f.params.itemPageTemplate);
        }
        else {
            f.itemPageTemplate = t7.compile(itemPageTemplate);
        }
        // Item Popup Template
        if (f.params.itemPopupTemplate) {
            if (typeof f.params.itemPopupTemplate === 'function') f.itemPopupTemplate = f.params.itemPopupTemplate;
            else if (typeof f.params.itemPopupTemplate === 'string') f.itemPopupTemplate = t7.compile(f.params.itemPopupTemplate);
        }
        else {
            f.itemPopupTemplate = t7.compile(itemPopupTemplate);
        }

        f.loadFeed = function (refresh) {
            if (f.params.onAjaxStart) f.params.onAjaxStart(f);
            $.get(f.params.url, function (response) {
                if (f.params.onAjaxComplete) f.params.onAjaxComplete(f, response);
                var parser = new DOMParser();
                var fragment = parser.parseFromString(response, 'text/xml');
                var channel = $(fragment).find('rss > channel');
                if(channel.length === 0) return;
                f.data = {
                    title: channel.children('title').text(),
                    link: channel.children('link').text(),
                    description: channel.children('description').text().replace('<![CDATA[', '').replace(']]>', ''),
                    copyright: channel.children('copyright').text(),
                    image: {
                        url: channel.children('image').children('url').text(),
                        title: channel.children('image').children('title').text(),
                        link: channel.children('image').children('link').text(),
                        width: channel.children('image').children('width').text(),
                        height: channel.children('image').children('height').text(),
                    },
                    items: []
                };
                var items = channel.find('item');
                items.each(function (index, el) {
                    var item = $(el);
                    var itemData = {
                        title: item.children('title').text().replace('<![CDATA[', '').replace(']]>', ''),
                        link: item.children('link').text(),
                        description: item.children('description').text().replace('<![CDATA[', '').replace(']]>', ''),
                        pubDate: item.children('pubDate').text(),
                        formattedDate: f.params.formatDate(item.children('pubDate').text()),
                        guid: item.children('guid').text(),
                        index: f.data.items.length
                    };
                    if (f.params.customItemFields && f.params.customItemFields.length > 0) {
                        item.children().each(function () {
                            for (var i = 0; i < f.params.customItemFields.length; i++) {
                                var fieldName = f.params.customItemFields[i].split('||')[0];
                                var fieldAttr = f.params.customItemFields[i].split('||')[1];
                                if (this.nodeName === fieldName) {
                                    if (fieldAttr) itemData[fieldName.replace(/:/g, '')] = this.getAttribute(fieldAttr);
                                    else itemData[fieldName.replace(/:/g, '')] = $(this).text().replace('<![CDATA[', '').replace(']]>', '');
                                }
                            }
                        });
                    }
                    f.data.items.push(itemData);
                });
                if (f.params.virtualList) {
                    if (refresh) {
                        f.virtualList.replaceAllItems(f.data.items);
                    }
                    else {
                        if (f.params.virtualList === 'true' || f.params.virtualList === true) {
                            f.params.virtualList = {};
                        }
                        f.params.virtualList.items = f.data.items;
                        f.params.virtualList.template = f.params.virtualList.template || virtualListItemTemplate;
                        f.virtualList = app.virtualList(f.container, f.params.virtualList);    
                    }
                }
                else {
                    f.container.html(f.listTemplate(f.data));
                }
                    
                // Reset PTR
                if (refresh) app.pullToRefreshDone(f.container.parents('.pull-to-refresh-content'));
            });
        };
        f.refreshFeed = function () {
            return f.loadFeed(true);
        };

        f.openItem = function (item) {
            if (f.params.openIn === 'page') {
                var view = f.container.parents('.' + app.params.viewClass)[0].f7View;
                if (!view) return;

                view.router.load({
                    template: f.itemPageTemplate,
                    context: item
                });
            }
            else if (f.params.openIn === 'popup') {
                app.popup(f.itemPopupTemplate(item));
            }
        };

        // Click event to load single item
        f.container.on('click', 'a.feeds-item-link', function (e) {
            e.preventDefault();
            var index = $(this).data('index');
            f.openItem(f.data.items[index]);
        });
        f.container.parents('.pull-to-refresh-content').on('refresh', function () {
            var ptr = $(this);
            f.refreshFeed();
        });

        f.loadFeed();

        f.container[0].f7Feed = f;

        return f;
    };
    app.feeds = function (container, params) {
        return new Feeds(container, params);
    };

    function pageInit(page) {
        $(page.container).find('.feeds-init').each(function () {
            var f = $(this);
            app.feeds(this, {
                url: f.attr('data-url'),
                openIn: f.attr('data-openIn') || undefined,
                virtualList: f.attr('data-virtualList') || undefined,
                listTemplate: f.attr('data-listTemplate') && app.templates && app.templates[f.attr('data-listTemplate')] || undefined,
                itemPageTemplate: f.attr('data-itemPageTemplate') && app.templates && app.templates[f.attr('data-itemPageTemplate')] || undefined,
                itemPopupTemplate: f.attr('data-itemPopupTemplate') && app.templates && app.templates[f.attr('data-itemPopupTemplate')] || undefined,
            });
        });
    }
    
    return {
        hooks : {
            pageInit: pageInit,
        }
    };
};