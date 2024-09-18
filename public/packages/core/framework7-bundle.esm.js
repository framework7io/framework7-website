/**
 * Framework7 8.3.4
 * Full featured mobile HTML framework for building iOS & Android apps
 * https://framework7.io/
 *
 * Copyright 2014-2024 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 18, 2024
 */

import $ from './shared/dom7.js';
import Framework7 from './components/app/app-class.js';
import * as utils from './shared/utils.js';
import { getSupport } from './shared/get-support.js';
import { getDevice } from './shared/get-device.js';
import DeviceModule from './modules/device/device.js';
import SupportModule from './modules/support/support.js';
import UtilsModule from './modules/utils/utils.js';
import ResizeModule from './modules/resize/resize.js';
import TouchModule from './modules/touch/touch.js';
import ClicksModule from './modules/clicks/clicks.js';
import RouterModule from './modules/router/router.js';
import RouterComponentLoaderModule from './modules/router/component-loader.js';
import ComponentModule, { Component, $jsx } from './modules/component/component.js';
import HistoryModule from './modules/history/history.js';
import ServiceWorkerModule from './modules/service-worker/service-worker.js';
import StoreModule, { createStore } from './modules/store/store.js';
import Statusbar from './components/statusbar/statusbar.js';
import View from './components/view/view.js';
import Navbar from './components/navbar/navbar.js';
import Toolbar from './components/toolbar/toolbar.js';
import Subnavbar from './components/subnavbar/subnavbar.js';
import TouchRipple from './components/touch-ripple/touch-ripple.js';
import Modal from './components/modal/modal.js';
import Router from './modules/router/router-class.js';
import Dialog from './components/dialog/dialog.js';
import Popup from './components/popup/popup.js';
import LoginScreen from './components/login-screen/login-screen.js';
import Popover from './components/popover/popover.js';
import Actions from './components/actions/actions.js';
import Sheet from './components/sheet/sheet.js';
import Toast from './components/toast/toast.js';
import Preloader from './components/preloader/preloader.js';
import Progressbar from './components/progressbar/progressbar.js';
import Sortable from './components/sortable/sortable.js';
import Swipeout from './components/swipeout/swipeout.js';
import Accordion from './components/accordion/accordion.js';
import ContactsList from './components/contacts-list/contacts-list.js';
import VirtualList from './components/virtual-list/virtual-list.js';
import ListIndex from './components/list-index/list-index.js';
import Timeline from './components/timeline/timeline.js';
import Tabs from './components/tabs/tabs.js';
import Panel from './components/panel/panel.js';
import Card from './components/card/card.js';
import Chip from './components/chip/chip.js';
import Form from './components/form/form.js';
import Input from './components/input/input.js';
import Checkbox from './components/checkbox/checkbox.js';
import Radio from './components/radio/radio.js';
import Toggle from './components/toggle/toggle.js';
import Range from './components/range/range.js';
import Stepper from './components/stepper/stepper.js';
import SmartSelect from './components/smart-select/smart-select.js';
import Grid from './components/grid/grid.js';
import Calendar from './components/calendar/calendar.js';
import Picker from './components/picker/picker.js';
import InfiniteScroll from './components/infinite-scroll/infinite-scroll.js';
import PullToRefresh from './components/pull-to-refresh/pull-to-refresh.js';
import DataTable from './components/data-table/data-table.js';
import Fab from './components/fab/fab.js';
import Searchbar from './components/searchbar/searchbar.js';
import Messages from './components/messages/messages.js';
import Messagebar from './components/messagebar/messagebar.js';
import Swiper from './components/swiper/swiper.js';
import PhotoBrowser from './components/photo-browser/photo-browser.js';
import Notification from './components/notification/notification.js';
import Autocomplete from './components/autocomplete/autocomplete.js';
import Tooltip from './components/tooltip/tooltip.js';
import Gauge from './components/gauge/gauge.js';
import Skeleton from './components/skeleton/skeleton.js';
import ColorPicker from './components/color-picker/color-picker.js';
import Treeview from './components/treeview/treeview.js';
import TextEditor from './components/text-editor/text-editor.js';
import PieChart from './components/pie-chart/pie-chart.js';
import AreaChart from './components/area-chart/area-chart.js';
import Breadcrumbs from './components/breadcrumbs/breadcrumbs.js';
import Typography from './components/typography/typography.js';
Router.use([RouterComponentLoaderModule]);
Framework7.use([DeviceModule, SupportModule, UtilsModule, ResizeModule, TouchModule, ClicksModule, RouterModule, HistoryModule, ComponentModule, ServiceWorkerModule, StoreModule, Statusbar, View, Navbar, Toolbar, Subnavbar, TouchRipple, Modal, Dialog, Popup, LoginScreen, Popover, Actions, Sheet, Toast, Preloader, Progressbar, Sortable, Swipeout, Accordion, ContactsList, VirtualList, ListIndex, Timeline, Tabs, Panel, Card, Chip, Form, Input, Checkbox, Radio, Toggle, Range, Stepper, SmartSelect, Grid, Calendar, Picker, InfiniteScroll, PullToRefresh, DataTable, Fab, Searchbar, Messages, Messagebar, Swiper, PhotoBrowser, Notification, Autocomplete, Tooltip, Gauge, Skeleton, ColorPicker, Treeview, TextEditor, PieChart, AreaChart, Breadcrumbs, Typography]);
export { Component, $jsx, $ as Dom7, utils, getDevice, getSupport, createStore };
export default Framework7;
