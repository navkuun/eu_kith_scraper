const userAgents = require('./userAgents')
const referers = require('./referers')
const ips = require('./ips')
module.exports = {
	/**
	 * 获得随机的一个user-agent
	 * @returns {string}
	 */
	generateUserAgent:function(){
		var randomIndex = Math.floor(Math.random() * userAgents.length); 
		return userAgents[randomIndex];
	},
	/**
	 * 获得随机的一个referrer
	 * @returns {string}
	 */
	generateReferer:function(){
		var randomIndex = Math.floor(Math.random() * referers.length); 
		return referers[randomIndex];
	},
	/**
	 * 获得随机的一个ip地址
	 * @returns {string}
	 */
	generateIp:function(){
		var randomIndex = Math.floor(Math.random() * ips.length); 
		return ips[randomIndex];
	}
}