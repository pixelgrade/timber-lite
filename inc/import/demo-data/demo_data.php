<?php

$demo_menus = array(
	'primary' => 'Main Menu',
	'social' => 'Social Menu'
);

$demo_reading_pages = array(
	'front' => 'Front page — Featured Projects Slider',
	'blog' => 'Journal'
);

/**
 * Use this plugin to export WordPress options https://wordpress.org/plugins/options-importer/
 * Steps:
 * 1 - Export the demo options
 * 2 - From the exported file get only the options array and encode it http://vps5.cgwizz.com/encoder/
 * 3 - After that paste the encoded string here:
 */
$theme_options = "ew0KICAgICJuYXZfbWVudV9vcHRpb25zIjogImE6Mjp7aTowO2I6MDtzOjg6XCJhdXRvX2FkZFwiO2E6MDp7fX0iLA0KICAgICJ0aGVtZV9tb2RzX3RpbWJlciI6ICJhOjI6e2k6MDtiOjA7czoxODpcIm5hdl9tZW51X2xvY2F0aW9uc1wiO2E6Mjp7czo3OlwicHJpbWFyeVwiO2k6NztzOjY6XCJzb2NpYWxcIjtpOjk7fX0iLA0KICAgICJ0aW1iZXJfb3B0aW9ucyI6ICJhOjk6e3M6MTM6XCJoZWFkaW5nc19mb250XCI7czoyNTY6XCJ7XCJ0eXBlXCI6XCJnb29nbGVcIixcImZvbnRfZmFtaWx5XCI6XCJFayBNdWt0YVwiLFwidmFyaWFudHNcIjp7XCIwXCI6XCIyMDBcIixcIjFcIjpcIjMwMFwiLFwiMlwiOlwicmVndWxhclwiLFwiM1wiOlwiNTAwXCIsXCI0XCI6XCI2MDBcIixcIjVcIjpcIjcwMFwiLFwiNlwiOlwiODAwXCJ9LFwic2VsZWN0ZWRfdmFyaWFudHNcIjp7XCIwXCI6XCIyMDBcIn0sXCJzdWJzZXRzXCI6e1wiMFwiOlwiZGV2YW5hZ2FyaVwiLFwiMVwiOlwibGF0aW5cIixcIjJcIjpcImxhdGluLWV4dFwifSxcInNlbGVjdGVkX3N1YnNldHNcIjp7XCIwXCI6XCJkZXZhbmFnYXJpXCJ9fVwiO3M6OTpcImJvZHlfZm9udFwiO3M6MjU2Olwie1widHlwZVwiOlwiZ29vZ2xlXCIsXCJmb250X2ZhbWlseVwiOlwiRWsgTXVrdGFcIixcInZhcmlhbnRzXCI6e1wiMFwiOlwiMjAwXCIsXCIxXCI6XCIzMDBcIixcIjJcIjpcInJlZ3VsYXJcIixcIjNcIjpcIjUwMFwiLFwiNFwiOlwiNjAwXCIsXCI1XCI6XCI3MDBcIixcIjZcIjpcIjgwMFwifSxcInNlbGVjdGVkX3ZhcmlhbnRzXCI6e1wiMFwiOlwiMjAwXCJ9LFwic3Vic2V0c1wiOntcIjBcIjpcImRldmFuYWdhcmlcIixcIjFcIjpcImxhdGluXCIsXCIyXCI6XCJsYXRpbi1leHRcIn0sXCJzZWxlY3RlZF9zdWJzZXRzXCI6e1wiMFwiOlwiZGV2YW5hZ2FyaVwifX1cIjtzOjEyOlwiY2FwdGlvbl9mb250XCI7czoyMTA6XCJ7XCJ0eXBlXCI6XCJnb29nbGVcIixcImZvbnRfZmFtaWx5XCI6XCJMaWJyZSBCYXNrZXJ2aWxsZVwiLFwidmFyaWFudHNcIjp7XCIwXCI6XCJyZWd1bGFyXCIsXCIxXCI6XCJpdGFsaWNcIixcIjJcIjpcIjcwMFwifSxcInNlbGVjdGVkX3ZhcmlhbnRzXCI6e1wiMFwiOlwicmVndWxhclwifSxcInN1YnNldHNcIjp7XCIwXCI6XCJsYXRpblwiLFwiMVwiOlwibGF0aW4tZXh0XCJ9LFwic2VsZWN0ZWRfc3Vic2V0c1wiOntcIjBcIjpcImxhdGluXCJ9fVwiO3M6ODpcIm5hdl9mb250XCI7czoyNTY6XCJ7XCJ0eXBlXCI6XCJnb29nbGVcIixcImZvbnRfZmFtaWx5XCI6XCJFayBNdWt0YVwiLFwidmFyaWFudHNcIjp7XCIwXCI6XCIyMDBcIixcIjFcIjpcIjMwMFwiLFwiMlwiOlwicmVndWxhclwiLFwiM1wiOlwiNTAwXCIsXCI0XCI6XCI2MDBcIixcIjVcIjpcIjcwMFwiLFwiNlwiOlwiODAwXCJ9LFwic2VsZWN0ZWRfdmFyaWFudHNcIjp7XCIwXCI6XCIyMDBcIn0sXCJzdWJzZXRzXCI6e1wiMFwiOlwiZGV2YW5hZ2FyaVwiLFwiMVwiOlwibGF0aW5cIixcIjJcIjpcImxhdGluLWV4dFwifSxcInNlbGVjdGVkX3N1YnNldHNcIjp7XCIwXCI6XCJkZXZhbmFnYXJpXCJ9fVwiO3M6MTY6XCJzaG93X3NoYXJlX2xpbmtzXCI7YjoxO3M6MTQ6XCJzcGFjaW5nX2hlYWRlclwiO2k6NTA7czoxNDpcInNwYWNpbmdfZm9vdGVyXCI7aTowO3M6MTc6XCJmaWxtc3RyaXBfc3BhY2luZ1wiO2k6MTA7czoyMjpcInNoYXJlX2J1dHRvbnNfc2V0dGluZ3NcIjtzOjU1OlwiZmFjZWJvb2ssIHR3aXR0ZXIsIHBpbnRlcmVzdF9zaGFyZSwgdHVtYmxyLCBlbWFpbCwgbW9yZVwiO30iLA0KfQ==";

//The export of the widgets using this plugin http://wordpress.org/plugins/widget-settings-importexport/ - base64 encoded: http://www.base64encode.org/
$demo_widgets = 'W3sib3ZlcmxheS13aWRnZXQtYXJlYS0xIjpbInRleHQtMyIsInRleHQtNCIsInRleHQtNSIsIm5hdl9tZW51LTMiLCJ0ZXh0LTYiXSwib3ZlcmxheS13aWRnZXQtYXJlYS0yIjpbInRleHQtNyIsIm5hdl9tZW51LTQiLCJuYXZfbWVudS02IiwibmF2X21lbnUtNyIsInRleHQtOSJdLCJvdmVybGF5LXdpZGdldC1hcmVhLTMiOlsidGltYmVyLWltYWdlLTIiXX0seyJ0ZXh0Ijp7IjMiOnsidGl0bGUiOiIiLCJ0ZXh0IjoiSGV5IHRoZXJlLFxyXG5cclxuSVx1MjAxOW0gPGEgaHJlZj1cIiNcIj5BbnNlbCBBZGFtczxcL2E+IFx1MjAxNCAgYSBkaWdpdGFsIGFydCBkaXJlY3RvciBhbmQgcGhvdG9ncmFwaGVyIGJhc2VkIGluIFBhcmlzICYgTmFudGVzLCBGcmFuY2UuIFxyXG5cclxuSVx1MjAxOW0gY3VycmVudGx5IHdvcmtpbmcgYXMgbWFpbiBwaG90b2dyYXBoZXIgd2l0aCB0aGUgYXdlc29tZSA8YSBocmVmPVwiaHR0cHM6XC9cL3R3aXR0ZXIuY29tXC9waXhlbGdyYWRlXCI+QHBpeGVsZ3JhZGU8XC9hPiB0ZWFtLiAiLCJmaWx0ZXIiOnRydWV9LCI0Ijp7InRpdGxlIjoiQXZhaWxhYmxlIGZvciBmcmVlbGFuY2VyIHdvcmsiLCJ0ZXh0IjoiPGEgaHJlZj1cIiNcIj5hZGFtQHBpeGVsZ3JhZGUuY29tPFwvYT4iLCJmaWx0ZXIiOmZhbHNlfSwiNSI6eyJ0aXRsZSI6IkkgY2FuIGhlbHAgeW91IHdpdGgiLCJ0ZXh0IjoiRmFtaWx5IFBvcnRyYWl0c1xyXG5FbmdhZ2VtZW50IFNlc3Npb25cclxuTWF0ZXJuaXR5ICYgTmV3Ym9yblxyXG5XZWRkaW5ncyIsImZpbHRlciI6dHJ1ZX0sIjYiOnsidGl0bGUiOiIiLCJ0ZXh0IjoiSW1hZ2UgY3JlZGl0c1xyXG5ATGF1cmVudCBOaXZhbGxlIiwiZmlsdGVyIjp0cnVlfSwiNyI6eyJ0aXRsZSI6IiIsInRleHQiOiJDaGVjayBvdXQgc29tZSByZWxldmFudCBwYWdlcyB0aGF0IHlvdSBjYW4gY3JlYXRlIGFuZCB1c2Ugd2l0aCBUaW1iZXIuIiwiZmlsdGVyIjpmYWxzZX0sIjkiOnsidGl0bGUiOiIiLCJ0ZXh0IjoiPGEgaHJlZj1cIlwiPk5vdGU6PFwvYT4gQW55IG9mIHRoZSAgYWJvdmUgcGFnZXMgY2FuIGJlIHNldCBhcyBhIEZyb250UGFnZS4iLCJmaWx0ZXIiOmZhbHNlfSwiX211bHRpd2lkZ2V0IjoxfSwibmF2X21lbnUiOnsiMyI6eyJ0aXRsZSI6IllvdSBjYW4gZmluZCBtZSBvbiIsIm5hdl9tZW51Ijo5fSwiNCI6eyJ0aXRsZSI6IkdhbGxlcmllcyIsIm5hdl9tZW51IjoxMX0sIjYiOnsidGl0bGUiOiJGZWF0dXJlZCBTbGlkZXIiLCJuYXZfbWVudSI6MTJ9LCI3Ijp7InRpdGxlIjoiR2FsbGVyaWVzIEFyY2hpdmUiLCJuYXZfbWVudSI6MTN9LCJfbXVsdGl3aWRnZXQiOjF9LCJ0aW1iZXItaW1hZ2UiOnsiMiI6eyJpbWFnZV9pZCI6MTk2fSwiX211bHRpd2lkZ2V0IjoxfX1d';