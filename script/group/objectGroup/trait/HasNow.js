/**
 *   RPG Chart Maker source file HasObjectGroupAddEntry,
 *   Copyright (C) 2017  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
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
