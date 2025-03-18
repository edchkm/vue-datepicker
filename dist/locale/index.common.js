'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Language {
  // eslint-disable-next-line max-params
  constructor(language, months, monthsAbbr, days) {
    let rtl = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    let ymd = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    let yearSuffix = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
    this.language = language;
    this.months = months;
    this.monthsAbbr = monthsAbbr;
    this.days = days;
    this.rtl = rtl;
    this.ymd = ymd;
    this.yearSuffix = yearSuffix;
  }

  /* eslint-disable no-underscore-dangle */
  get language() {
    return this._language;
  }
  set language(language) {
    if (typeof language !== 'string') {
      throw new TypeError('Language must be a string');
    }
    this._language = language;
  }
  get months() {
    return this._months;
  }
  set months(months) {
    if (months.length !== 12) {
      throw new RangeError(`There must be 12 months for ${this.language} language`);
    }
    this._months = months;
  }
  get monthsAbbr() {
    return this._monthsAbbr;
  }
  set monthsAbbr(monthsAbbr) {
    if (monthsAbbr.length !== 12) {
      throw new RangeError(`There must be 12 abbreviated months for ${this.language} language`);
    }
    this._monthsAbbr = monthsAbbr;
  }
  get days() {
    return this._days;
  }
  set days(days) {
    if (days.length !== 7) {
      throw new RangeError(`There must be 7 days for ${this.language} language`);
    }
    this._days = days;
  }
  getDaysStartingOn(firstDayOfWeek) {
    const firstDays = this._days.slice(firstDayOfWeek);
    const lastDays = this._days.slice(0, firstDayOfWeek);
    return firstDays.concat(lastDays);
  }
  getMonthByAbbrName(name) {
    const monthValue = this._monthsAbbr.findIndex(month => month === name) + 1;
    return monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
  }
  getMonthByName(name) {
    const monthValue = this._months.findIndex(month => month === name) + 1;
    return monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
  }
}

var af = new Language('Afrikaans', ['Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie', 'Julie', 'Augustus', 'September', 'Oktober', 'November', 'Desember'], ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'], ['So.', 'Ma.', 'Di.', 'Wo.', 'Do.', 'Vr.', 'Sa.']);

const language$e = new Language('Arabic', ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوڤمبر', 'ديسمبر'], ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوڤمبر', 'ديسمبر'], ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'], true);
var language$f = language$e;

var bg = new Language('Bulgarian', ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'], ['Ян', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'], ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']);

var bs = new Language('Bosnian', ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'], ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'], ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']);

var ca = new Language('Catalan', ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'], ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'], ['Diu', 'Dil', 'Dmr', 'Dmc', 'Dij', 'Div', 'Dis']);

var cs = new Language('Czech', ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'], ['led', 'úno', 'bře', 'dub', 'kvě', 'čer', 'čec', 'srp', 'zář', 'říj', 'lis', 'pro'], ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so']);

var da = new Language('Danish', ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'], ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'], ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø']);

var de = new Language('German', ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'], ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'], ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']);

var ee = new Language('Estonian', ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'], ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni', 'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'], ['P', 'E', 'T', 'K', 'N', 'R', 'L']);

var el = new Language('Greek', ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάϊος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'], ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'], ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σατ']);

var en = new Language('English', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

var es = new Language('Spanish', ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']);

var fa = new Language('Persian', ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'], ['فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف'], ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']);

var fi = new Language('Finish', ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'], ['tammi', 'helmi', 'maalis', 'huhti', 'touko', 'kesä', 'heinä', 'elo', 'syys', 'loka', 'marras', 'joulu'], ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la']);

var fo = new Language('Faroese', ['Januar', 'Februar', 'Mars', 'Apríl', 'Mai', 'Juni', 'Juli', 'August', 'Septembur', 'Oktobur', 'Novembur', 'Desembur'], ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'], ['Sun', 'Mán', 'Týs', 'Mik', 'Hós', 'Frí', 'Ley']);

var fr = new Language('French', ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'], ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'], ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']);

var ge = new Language('Georgia', ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'], ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'], ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ']);

const language$c = new Language('Hebrew', ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'], ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'], ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'], true);
var language$d = language$c;

var hr = new Language('Croatian', ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'], ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'], ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']);

var hu = new Language('Hungarian', ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'], ['Jan', 'Febr', 'Márc', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'], ['Vas', 'Hét', 'Ke', 'Sze', 'Csü', 'Pén', 'Szo']);

var id = new Language('Indonesian', ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'], ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'], ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']);

var is = new Language('Icelandic', ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'], ['Jan', 'Feb', 'Mars', 'Apr', 'Maí', 'Jún', 'Júl', 'Ágú', 'Sep', 'Okt', 'Nóv', 'Des'], ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau']);

var it = new Language('Italian', ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'], ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'], ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']);

const language$a = new Language('Japanese', ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], ['日', '月', '火', '水', '木', '金', '土'], false, true, '年');
var language$b = language$a;

var kk = new Language('Kazakh', ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'], ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел'], ['Жк', 'Дй', 'Сй', 'Ср', 'Бй', 'Жм', 'Сн']);

const language$8 = new Language('Korean', ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], ['일', '월', '화', '수', '목', '금', '토'], false, false, '년');
var language$9 = language$8;

var lb = new Language('Luxembourgish', ['Januar', 'Februar', 'Mäerz', 'Abrëll', 'Mäi', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'], ['Jan', 'Feb', 'Mäe', 'Abr', 'Mäi', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'], ['So.', 'Mé.', 'Dë.', 'Më.', 'Do.', 'Fr.', 'Sa.']);

const language$6 = new Language('Lithuanian', ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'], ['Sau', 'Vas', 'Kov', 'Bal', 'Geg', 'Bir', 'Lie', 'Rugp', 'Rugs', 'Spa', 'Lap', 'Gru'], ['Sek', 'Pir', 'Ant', 'Tre', 'Ket', 'Pen', 'Šeš'], false, true);
var language$7 = language$6;

var lv = new Language('Latvian', ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'], ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jūn', 'Jūl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'], ['Sv', 'Pr', 'Ot', 'Tr', 'Ce', 'Pk', 'Se']);

const language$4 = new Language('Mongolia', ['1 дүгээр сар', '2 дугаар сар', '3 дугаар сар', '4 дүгээр сар', '5 дугаар сар', '6 дугаар сар', '7 дугаар сар', '8 дугаар сар', '9 дүгээр сар', '10 дугаар сар', '11 дүгээр сар', '12 дугаар сар'], ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар'], ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'], false, true);
var language$5 = language$4;

var nbNO = new Language('Norwegian Bokmål', ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'], ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'], ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø']);

var nl = new Language('Dutch', ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'], ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'], ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']);

var pl = new Language('Polish', ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'], ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'], ['Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob']);

var ptBR = new Language('Brazilian', ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'], ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']);

var ro = new Language('Romanian', ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'], ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'], ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S']);

var ru = new Language('Russian', ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'], ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'], ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']);

var sk = new Language('Slovakian', ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december'], ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'], ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so']);

var slSI = new Language('Sloveian', ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'], ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'], ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob']);

var sq = new Language('Albanian', ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'], ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Korr', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'], ['D', 'Ha', 'Ma', 'Mr', 'Ej', 'Pr', 'Sh']);

var sr = new Language('Serbian', ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'], ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'], ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub']);

var srCYRL = new Language('Serbian in Cyrillic script', ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар'], ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дец'], ['Нед', 'Пон', 'Уто', 'Сре', 'Чет', 'Пет', 'Суб']);

var sv = new Language('Swedish', ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'], ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'], ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör']);

var th = new Language('Thai', ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'], ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'], ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']);

var tr = new Language('Turkish', ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'], ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'], ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']);

var uk = new Language('Ukraine', ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'], ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Чер', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'], ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']);

const language$2 = new Language('Urdu', ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'سپتمبر', 'اکتوبر', 'نومبر', 'دسمبر'], ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'سپتمبر', 'اکتوبر', 'نومبر', 'دسمبر'], ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'], true);
var language$3 = language$2;

var vi = new Language('Vietnamese', ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12'], ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'], ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']);

const language = new Language('Chinese', ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], ['日', '一', '二', '三', '四', '五', '六'], false, false, '年');
var language$1 = language;

exports.af = af;
exports.ar = language$f;
exports.bg = bg;
exports.bs = bs;
exports.ca = ca;
exports.cs = cs;
exports.da = da;
exports.de = de;
exports.ee = ee;
exports.el = el;
exports.en = en;
exports.es = es;
exports.fa = fa;
exports.fi = fi;
exports.fo = fo;
exports.fr = fr;
exports.ge = ge;
exports.he = language$d;
exports.hr = hr;
exports.hu = hu;
exports.id = id;
exports.is = is;
exports.it = it;
exports.ja = language$b;
exports.kk = kk;
exports.ko = language$9;
exports.lb = lb;
exports.lt = language$7;
exports.lv = lv;
exports.mn = language$5;
exports.nbNO = nbNO;
exports.nl = nl;
exports.pl = pl;
exports.ptBR = ptBR;
exports.ro = ro;
exports.ru = ru;
exports.sk = sk;
exports.slSI = slSI;
exports.sq = sq;
exports.sr = sr;
exports.srCYRL = srCYRL;
exports.sv = sv;
exports.th = th;
exports.tr = tr;
exports.uk = uk;
exports.ur = language$3;
exports.vi = vi;
exports.zh = language$1;
