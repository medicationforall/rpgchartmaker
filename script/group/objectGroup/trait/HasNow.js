function HasNow(){
  /**
	 * @return The current system time for the user in a a format appropriate for a datetime input.
	 * @private
	 */
	this.getNow = function () {
		var now = new Date($.now());
		var year;
		var month
		var date
		var hours
		var minutes
		var seconds
		var formattedDateTime;

		year = now.getFullYear();
		month = now.getMonth().toString().length === 1 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1;
		date = now.getDate().toString().length === 1 ? '0' + (now.getDate()).toString() : now.getDate();
		hours = now.getHours().toString().length === 1 ? '0' + now.getHours().toString() : now.getHours();
		minutes = now.getMinutes().toString().length === 1 ? '0' + now.getMinutes().toString() : now.getMinutes();
		seconds = now.getSeconds().toString().length === 1 ? '0' + now.getSeconds().toString() : now.getSeconds();

		formattedDateTime = year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds;

		return formattedDateTime;
	};
}
