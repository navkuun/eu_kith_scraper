const headerData = require('./headerData')
var userAgent = headerData.generateUserAgent()
var ip = headerData.generateIp()
var referer = headerData.generateReferer()
module.exports = function(superagent){
   const Request = superagent.Request
   Request.prototype.scraper = function(){
   		this.set('Accept','*/*')
			.set('Accept-Encoding','gzip, deflate, sdch')
			.set('Accept-Language','en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4')
			.set('User-Agent',userAgent)
			.set('X_FORWARDED_FOR',ip)
			.set('Referer',referer)
		return this
   }
}