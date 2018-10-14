'use strict';

var device = require("../lib/device.js");

function addAttr() {
	const   deviceTablet 	= device.tablet(),
	        deviceMobile 	= device.mobile(),
	        deviceDesktop 	= device.desktop(),
	        deviceAndroid 	= device.android(),
	        deviceiOS 		= device.ios(),
	        orientation 	= device.portrait();

	body.setAttribute('data-orientation-portrait', orientation);

	body.setAttribute('data-tablet', deviceTablet);
	body.setAttribute('data-mobile', deviceMobile);
	body.setAttribute('data-desktop', deviceDesktop);
	body.setAttribute('data-android', deviceAndroid);
	body.setAttribute('data-ios', deviceiOS);
};

export default addAttr;