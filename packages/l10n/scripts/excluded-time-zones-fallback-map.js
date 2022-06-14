const EXCLUDED_TIME_ZONES_FALLBACK_MAP = {
  'Africa/Abidjan': ['Africa/Accra', 'Africa/Lome'],
  'Africa/Addis_Ababa': [],
  'Africa/Algiers': [],
  'Africa/Asmara': ['Africa/Asmera'],
  'Africa/Bamako': ['Africa/Timbuktu'],
  'Africa/Bissau': [],
  'Africa/Blantyre': [],
  'Africa/Bujumbura': [],
  'Africa/Cairo': ['Africa/Lusaka', 'Egypt', 'Libya'],
  'Africa/Casablanca': [],
  'Africa/Ceuta': [],
  'Africa/Conakry': ['Africa/Freetown'],
  'Africa/Dakar': ['Africa/Banjul', 'Africa/Nouakchott'],
  'Africa/Dar_es_Salaam': [],
  'Africa/Djibouti': [],
  'Africa/Gaborone': [],
  'Africa/Harare': [],
  'Africa/Johannesburg': ['Africa/Maseru', 'Africa/Mbabane'],
  'Africa/Juba': [],
  'Africa/Kampala': [],
  'Africa/Khartoum': [],
  'Africa/Kigali': [],
  'Africa/Lagos': [
    'Africa/Bangui',
    'Africa/Brazzaville',
    'Africa/Douala',
    'Africa/El_Aaiun',
    'Africa/Kinshasa',
    'Africa/Libreville',
    'Africa/Luanda',
    'Africa/Malabo',
    'Africa/Niamey',
    'Africa/Porto-Novo',
  ],
  'Africa/Lubumbashi': [],
  'Africa/Maputo': [],
  'Africa/Mogadishu': [],
  'Africa/Monrovia': [],
  'Africa/Nairobi': [],
  'Africa/Ndjamena': [],
  'Africa/Ouagadougou': [],
  'Africa/Sao_Tome': [],
  'Africa/Tripoli': [],
  'Africa/Tunis': [],
  'Africa/Windhoek': [],
  'America/Adak': ['America/Atka', 'US/Aleutian'],
  'America/Anchorage': [
    'America/Juneau',
    'America/Metlakatla',
    'America/Sitka',
    'America/Yakutat',
    'Etc/GMT+8',
    'MST',
    'US/Alaska',
  ],
  'America/Araguaina': [],
  'America/Argentina/Buenos_Aires': ['America/Buenos_Aires'],
  'America/Argentina/Catamarca': ['America/Catamarca'],
  'America/Argentina/Cordoba': [
    'America/Argentina/ComodRivadavia',
    'America/Argentina/Jujuy',
    'America/Argentina/La_Rioja',
    'America/Argentina/Mendoza',
    'America/Argentina/Rio_Gallegos',
    'America/Argentina/Salta',
    'America/Argentina/San_Juan',
    'America/Argentina/San_Luis',
    'America/Argentina/Tucuman',
    'America/Argentina/Ushuaia',
    'America/Cordoba',
    'America/Jujuy',
    'America/Mendoza',
    'America/Rosario',
  ],
  'America/Asuncion': [],
  'America/Atikokan': [],
  'America/Bahia_Banderas': [],
  'America/Barbados': [
    'America/Port_of_Spain',
    'America/St_Vincent',
    'America/Grenada',
  ],
  'America/Belize': [],
  'America/Blanc-Sablon': [],
  'America/Bogota': [],
  'America/Boise': [],
  'America/Cambridge_Bay': [],
  'America/Cancun': [],
  'America/Caracas': [],
  'America/Cayenne': [],
  'America/Chicago': ['US/Central'],
  'America/Chihuahua': [],
  'America/Costa_Rica': [],
  'America/Creston': [],
  'America/Curacao': ['America/Aruba', 'America/Kralendijk'],
  'America/Danmarkshavn': [],
  'America/Dawson': [],
  'America/Dawson_Creek': ['Canada/Yukon'],
  'America/Denver': [
    'America/Shiprock',
    'Etc/GMT+6',
    'MST7MDT',
    'Navajo',
    'US/Mountain',
    'Mexico/BajaSur',
  ],
  'America/Detroit': ['US/Michigan'],
  'America/Edmonton': ['Canada/Mountain', 'Canada/Saskatchewan'],
  'America/Eirunepe': [],
  'America/El_Salvador': [],
  'America/Fort_Nelson': [],
  'America/Fortaleza': ['America/Bahia', 'America/Belem'],
  'America/Grand_Turk': [],
  'America/Guatemala': [],
  'America/Guayaquil': [],
  'America/Guyana': [],
  'America/Havana': ['Cuba'],
  'America/Hermosillo': ['America/Ensenada'],
  'America/Indiana/Indianapolis': [
    'America/Fort_Wayne',
    'America/Indiana/Petersburg',
    'America/Indiana/Vevay',
    'America/Indiana/Vincennes',
    'America/Indianapolis',
    'US/East-Indiana',
  ],
  'America/Indiana/Knox': ['America/Knox_IN'],
  'America/Indiana/Tell_City': ['US/Indiana-Starke'],
  'America/Indiana/Winamac': [],
  'America/Inuvik': [],
  'America/Iqaluit': [],
  'America/Jamaica': ['America/Cayman', 'Jamaica'],
  'America/Kentucky/Louisville': [
    'America/Kentucky/Monticello',
    'America/Louisville',
  ],
  'America/La_Paz': [],
  'America/Lima': [],
  'America/Los_Angeles': [
    'Etc/GMT+7',
    'PST8PDT',
    'US/Pacific',
    'US/Pacific-New',
  ],
  'America/Managua': [],
  'America/Manaus': [
    'America/Boa_Vista',
    'America/Campo_Grande',
    'America/Cuiaba',
    'America/Porto_Velho',
    'Brazil/West',
  ],
  'America/Martinique': ['America/Dominica', 'America/Guadeloupe'],
  'America/Matamoros': [],
  'America/Mazatlan': [],
  'America/Menominee': [],
  'America/Merida': [],
  'America/Mexico_City': ['CST6CDT', 'Mexico/General'],
  'America/Miquelon': [],
  'America/Moncton': [
    'America/Glace_Bay',
    'America/Goose_Bay',
    'America/Halifax',
    'Canada/Atlantic',
  ],
  'America/Monterrey': [],
  'America/Montevideo': [],
  'America/New_York': [
    'EST',
    'Etc/GMT+5',
    'America/Indiana/Marengo',
    'America/Montreal',
    'America/Nassau',
    'US/Eastern',
  ],
  'America/Nome': [],
  'America/North_Dakota/Beulah': [],
  'America/North_Dakota/Center': [],
  'America/North_Dakota/New_Salem': [],
  'America/Nuuk': ['Etc/GMT+2', 'America/Godthab'],
  'America/Ojinaga': [],
  'America/Panama': [],
  'America/Paramaribo': [],
  'America/Phoenix': ['US/Arizona'],
  'America/Port-au-Prince': [],
  'America/Puerto_Rico': [
    'America/Anguilla',
    'America/Antigua',
    'America/Lower_Princes',
    'America/Marigot',
    'America/Montserrat',
    'America/St_Barthelemy',
    'America/St_Kitts',
    'America/St_Thomas',
    'America/Tortola',
    'America/Virgin',
  ],
  'America/Punta_Arenas': [],
  'America/Rankin_Inlet': [],
  'America/Regina': [],
  'America/Rio_Branco': ['America/Porto_Acre', 'Brazil/Acre'],
  'America/Santa_Isabel': [],
  'America/Santiago': [],
  'America/Santo_Domingo': [],
  'America/Sao_Paulo': [
    'America/Maceio',
    'America/Recife',
    'America/Santarem',
    'Brazil/East',
    'Etc/GMT+3',
  ],
  'America/St_Lucia': [],
  'America/Swift_Current': [],
  'America/Tegucigalpa': ['Mexico/BajaSur'],
  'America/Thule': [],
  'America/Thunder_Bay': ['America/Nipigon', 'America/Pangnirtung'],
  'America/Tijuana': ['Mexico/BajaNorte'],
  'America/Toronto': ['Canada/Eastern', 'EST5EDT', 'Etc/GMT+4'],
  'America/Vancouver': ['Canada/Pacific'],
  'America/Whitehorse': [],
  'America/Winnipeg': [
    'America/Coral_Harbour',
    'America/Rainy_River',
    'America/Resolute',
    'Canada/Central',
  ],
  'America/Yellowknife': [],
  'Antarctica/Davis': [],
  'Antarctica/Mawson': [],
  'Antarctica/Palmer': [],
  'Antarctica/Rothera': [],
  'Antarctica/Syowa': [],
  'Antarctica/Troll': [],
  'Antarctica/Vostok': [],
  'Asia/Aden': [],
  'Asia/Almaty': [],
  'Asia/Amman': [],
  'Asia/Anadyr': [],
  'Asia/Aqtau': [],
  'Asia/Aqtobe': [],
  'Asia/Ashgabat': ['Asia/Ashkhabad'],
  'Asia/Atyrau': [],
  'Asia/Baghdad': [],
  'Asia/Bahrain': [],
  'Asia/Baku': [],
  'Asia/Bangkok': [],
  'Asia/Barnaul': [],
  'Asia/Beirut': [],
  'Asia/Bishkek': ['Asia/Kashgar'],
  'Asia/Brunei': [],
  'Asia/Chita': [],
  'Asia/Choibalsan': [],
  'Asia/Colombo': [],
  'Asia/Damascus': [],
  'Asia/Dhaka': ['Asia/Dacca', 'Etc/GMT-6'],
  'Asia/Dili': [],
  'Asia/Dubai': ['Etc/GMT-4'],
  'Asia/Dushanbe': [],
  'Asia/Famagusta': [],
  'Asia/Gaza': [],
  'Asia/Hebron': [],
  'Asia/Ho_Chi_Minh': ['Asia/Saigon'],
  'Asia/Hong_Kong': ['Asia/Harbin', 'Etc/GMT-8', 'Hongkong'],
  'Asia/Hovd': [],
  'Asia/Irkutsk': [],
  'Asia/Istanbul': ['Europe/Istanbul', 'Turkey'],
  'Asia/Jakarta': ['Etc/GMT-7'],
  'Asia/Jayapura': [],
  'Asia/Jerusalem': ['Asia/Tel_Aviv', 'Israel'],
  'Asia/Kabul': [],
  'Asia/Kamchatka': [],
  'Asia/Karachi': ['Etc/GMT-5'],
  'Asia/Kathmandu': ['Asia/Katmandu'],
  'Asia/Khandyga': ['Asia/Yakutsk'],
  'Asia/Kolkata': ['Asia/Calcutta'],
  'Asia/Krasnoyarsk': ['Asia/Novokuznetsk'],
  'Asia/Kuala_Lumpur': [],
  'Asia/Kuching': [],
  'Asia/Kuwait': [],
  'Asia/Macau': ['Asia/Macao'],
  'Asia/Magadan': [],
  'Asia/Makassar': ['Asia/Ujung_Pandang'],
  'Asia/Manila': [],
  'Asia/Muscat': [],
  'Asia/Nicosia': ['Europe/Nicosia'],
  'Asia/Novosibirsk': [],
  'Asia/Omsk': [],
  'Asia/Oral': [],
  'Asia/Phnom_Penh': [],
  'Asia/Pontianak': [],
  'Asia/Pyongyang': [],
  'Asia/Qatar': [],
  'Asia/Qostanay': [],
  'Asia/Qyzylorda': [],
  'Asia/Riyadh': [],
  'Asia/Sakhalin': ['Etc/GMT-11'],
  'Asia/Samarkand': [],
  'Asia/Seoul': ['ROK'],
  'Asia/Shanghai': ['Asia/Chongqing', 'Asia/Chungking', 'PRC'],
  'Asia/Singapore': ['Singapore'],
  'Asia/Srednekolymsk': [],
  'Asia/Taipei': ['ROC'],
  'Asia/Tashkent': [],
  'Asia/Tbilisi': [],
  'Asia/Tehran': ['Iran'],
  'Asia/Thimphu': ['Asia/Thimbu'],
  'Asia/Tokyo': ['Etc/GMT-9', 'Japan'],
  'Asia/Tomsk': [],
  'Asia/Ulaanbaatar': ['Asia/Ulan_Bator'],
  'Asia/Urumqi': [],
  'Asia/Vientiane': [],
  'Asia/Vladivostok': ['Asia/Ust-Nera'],
  'Asia/Yangon': ['Asia/Rangoon'],
  'Asia/Yekaterinburg': [],
  'Asia/Yerevan': [],
  'Atlantic/Azores': [],
  'Atlantic/Bermuda': [],
  'Atlantic/Canary': [],
  'Atlantic/Cape_Verde': ['Etc/GMT+1'],
  'Atlantic/Faroe': ['Atlantic/Faeroe'],
  'Atlantic/Madeira': [],
  'Atlantic/Reykjavik': ['America/Scoresbysund', 'Iceland'],
  'Atlantic/South_Georgia': [],
  'Atlantic/St_Helena': [],
  'Atlantic/Stanley': [],
  'Australia/Adelaide': ['Australia/South', 'Australia/Yancowinna'],
  'Australia/Brisbane': ['Australia/Queensland'],
  'Australia/Broken_Hill': [],
  'Australia/Darwin': ['Australia/North'],
  'Australia/Eucla': [],
  'Australia/Hobart': [],
  'Australia/Lindeman': ['Antarctica/DumontDUrville'],
  'Australia/Lord_Howe': ['Australia/LHI'],
  'Australia/Melbourne': [
    'Australia/Currie',
    'Australia/Tasmania',
    'Australia/Victoria',
  ],
  'Australia/Perth': ['Australia/West'],
  'Australia/Sydney': [
    'Antarctica/Macquarie',
    'Australia/ACT',
    'Australia/Canberra',
    'Australia/NSW',
    'Etc/GMT-10',
  ],
  'Brazil/DeNoronha': ['America/Noronha'],
  'Canada/Newfoundland': ['America/St_Johns'],
  'Chile/Continental': [],
  'Europe/Amsterdam': [],
  'Europe/Andorra': [],
  'Europe/Astrakhan': [],
  'Europe/Athens': ['EET'],
  'Europe/Belgrade': [],
  'Europe/Berlin': ['CET', 'Etc/GMT-2', 'Europe/Busingen'],
  'Europe/Bratislava': [],
  'Europe/Brussels': [],
  'Europe/Bucharest': [],
  'Europe/Budapest': [],
  'Europe/Chisinau': ['Europe/Tiraspol'],
  'Europe/Copenhagen': [],
  'Europe/Dublin': ['Eire', 'Europe/Belfast', 'Europe/Isle_of_Man', 'GB-Eire'],
  'Europe/Gibraltar': [],
  'Europe/Guernsey': [],
  'Europe/Helsinki': ['Europe/Mariehamn'],
  'Europe/Kaliningrad': [],
  'Europe/Kiev': [],
  'Europe/Kirov': [],
  'Europe/Lisbon': ['Portugal', 'WET'],
  'Europe/Ljubljana': [],
  'Europe/London': ['Etc/GMT-1', 'Europe/Jersey', 'GB'],
  'Europe/Luxembourg': [],
  'Europe/Madrid': [],
  'Europe/Malta': [],
  'Europe/Minsk': [],
  'Europe/Monaco': [],
  'Europe/Moscow': ['Etc/GMT-3', 'W-SU'],
  'Europe/Oslo': ['Arctic/Longyearbyen', 'Atlantic/Jan_Mayen'],
  'Europe/Paris': [],
  'Europe/Prague': [],
  'Europe/Riga': [],
  'Europe/Rome': ['Europe/San_Marino', 'Europe/Vatican', 'MET'],
  'Europe/Samara': [],
  'Europe/Saratov': [],
  'Europe/Simferopol': [],
  'Europe/Skopje': [],
  'Europe/Sofia': [],
  'Europe/Stockholm': [],
  'Europe/Tallinn': [],
  'Europe/Tirane': ['Europe/Podgorica'],
  'Europe/Ulyanovsk': [],
  'Europe/Uzhgorod': [],
  'Europe/Vienna': [],
  'Europe/Vilnius': [],
  'Europe/Volgograd': [],
  'Europe/Warsaw': ['Poland'],
  'Europe/Zagreb': ['Europe/Sarajevo'],
  'Europe/Zaporozhye': [],
  'Europe/Zurich': ['Europe/Vaduz'],
  GMT: [
    'Etc/GMT',
    'Etc/Greenwich',
    'Etc/GMT-0',
    'Etc/GMT+0',
    'Etc/GMT0',
    'GMT-0',
    'GMT+0',
    'GMT0',
    'Greenwich',
  ],
  'Indian/Antananarivo': [],
  'Indian/Chagos': [],
  'Indian/Christmas': [],
  'Indian/Cocos': [],
  'Indian/Kerguelen': [],
  'Indian/Maldives': [],
  'Indian/Mauritius': ['Indian/Mahe'],
  'Indian/Mayotte': ['Indian/Comoro'],
  'Indian/Reunion': [],
  Kwajalein: ['Pacific/Kwajalein'],
  'Pacific/Apia': ['Etc/GMT-13'],
  'Pacific/Auckland': [
    'Antarctica/Casey',
    'Antarctica/McMurdo',
    'Antarctica/South_Pole',
    'Etc/GMT-12',
    'NZ',
  ],
  'Pacific/Bougainville': [],
  'Pacific/Chatham': ['NZ-CHAT'],
  'Pacific/Chuuk': ['Pacific/Yap'],
  'Pacific/Easter': ['Chile/EasterIsland'],
  'Pacific/Efate': [],
  'Pacific/Enderbury': [],
  'Pacific/Fakaofo': [],
  'Pacific/Fiji': [],
  'Pacific/Funafuti': [],
  'Pacific/Galapagos': [],
  'Pacific/Gambier': ['Etc/GMT+9'],
  'Pacific/Guadalcanal': [],
  'Pacific/Guam': ['Pacific/Saipan', 'Pacific/Truk'],
  'Pacific/Honolulu': ['Etc/GMT+10', 'HST', 'Pacific/Johnston', 'US/Hawaii'],
  'Pacific/Kanton': [],
  'Pacific/Kiritimati': ['Etc/GMT-14'],
  'Pacific/Kosrae': [],
  'Pacific/Majuro': [],
  'Pacific/Marquesas': [],
  'Pacific/Midway': ['Etc/GMT+11'],
  'Pacific/Nauru': [],
  'Pacific/Niue': [],
  'Pacific/Norfolk': [],
  'Pacific/Noumea': [],
  'Pacific/Pago_Pago': ['US/Samoa'],
  'Pacific/Palau': [],
  'Pacific/Pitcairn': [],
  'Pacific/Pohnpei': ['Pacific/Ponape'],
  'Pacific/Port_Moresby': [],
  'Pacific/Rarotonga': [],
  'Pacific/Samoa': [],
  'Pacific/Tahiti': [],
  'Pacific/Tarawa': ['Etc/GMT+12'],
  'Pacific/Tongatapu': [],
  'Pacific/Wake': [],
  'Pacific/Wallis': [],
  UTC: [
    'Etc/UCT',
    'Etc/Universal',
    'Etc/UTC',
    'Etc/Zulu',
    'UCT',
    'Universal',
    'Zulu',
  ],
};

module.exports = EXCLUDED_TIME_ZONES_FALLBACK_MAP;
