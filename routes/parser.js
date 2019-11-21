const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars')
const fetch = require('node-fetch');
const path = require("path");


router.get('/', async function (req, res) {
  res.render('parser');
});

router.post('/', async function (req, res, next) {
  
  // Получаем ИНН клиента из браузера (aplication.js)
  let inn = req.body.inn



  // Запрос данных из API ФНС
  const response = await fetch(process.env.API_URL.replace('#INN#', inn));

  // Проверка через ИНН 9715321680
  // const response = await fetch('https://api-fns.ru/api/egr?req=9715321680&key=195f234896a9df8091803dbaf94fb4a460fb5b8e');

  //Получаем ответ из API ФНС
  let data = await response.json()
  // let comname = data.items[0].ЮЛ.НаимСокрЮЛ

  // Тестовый файл, чтобы не юзать ключ API ФНС


    // const data = {items:
    //   [{ЮЛ:
    //     {
    //     ИНН:"9715321680",
    //     КПП:"771501001",
    //     ОГРН:"1187746790296",
    //     ДатаРег:"2018-09-03",
    //     ОКОПФ:"Общества с ограниченной ответственностью",
    //     Статус:"Действующее",
    //     СпОбрЮЛ:"Создание юридического лица",
    //     НО:{
    //       Рег:"7746 (Межрайонная инспекция Федеральной налоговой службы № 46 по г. Москве)",
    //       РегДата:"2018-09-03",
    //       Учет:"7715 (Инспекция Министерства Российской Федерации по налогам и сборам №15 по Северо-Восточному административному округу г.Москвы)",
    //       УчетДата:"2018-09-03"
    //     },
    //       ПФ:{
    //         РегНомПФ:"087315010674",
    //         ДатаРегПФ:"2018-09-04",
    //         КодПФ:"087315 (Государственное учреждение - Главное Управление Пенсионного фонда РФ №6 по г. Москве и Московской области муниципальный район Северное Медведково г.Москвы)"
    //       },
    //       ФСС:
    //       {
    //         РегНомФСС:"771111367277111",
    //         ДатаРегФСС:"2018-09-04",
    //         КодФСС:"7711 (Филиал №11 Государственного учреждения - Московского регионального отделения Фонда социального страхования Российской Федерации)"
    //       },
    //       Капитал:
    //       {
    //         ВидКап:"Уставный капитал",
    //         СумКап:"10000",
    //         Дата:"2018-09-03"
    //       },
    //       НаимСокрЮЛ:"ООО  САЛОН КРАСОТЫ \"БАР КРАСОТЫ\"",
    //       НаимПолнЮЛ:"ООО САЛОН КРАСОТЫ \"БАР КРАСОТЫ\"",
    //       Адрес:
    //       {
    //         КодРегион:"77",
    //         Индекс:"127224",
    //         АдресПолн:"г. Москва, пр-д Студёный, д.24, кв.145",
    //         Дата:"2018-09-03"
    //       },
    //       Руководитель:
    //       {
    //         ВидДолжн:"Руководитель юридического лица",Должн:"Генеральный директор",
    //         ФИОПолн:"Броева Заира Тенгизовна",
    //         ИННФЛ:"771597910710",
    //         Дата:"2018-09-03"
    //       },
    //       Учредители:
    //       [{
    //         УчрФЛ:
    //         {
    //           ФИОПолн:"Броева Заира Тенгизовна",
    //           ИННФЛ:"771597910710"
    //         },
    //         СуммаУК:"10000",
    //         Процент:"100",
    //         Дата:"2018-09-03"
    //       }],
    //       ОснВидДеят:
    //       {
    //         Код:"96.02",
    //         Текст:"Предоставление услуг парикмахерскими и салонами красоты"
    //       },
    //       ДопВидДеят:
    //       [{
    //         Код:"96.02.1",
    //         Текст:"Предоставление парикмахерских услуг"
    //       },
    //       {
    //         Код:"96.02.2",
    //         Текст:"Предоставление косметических услуг парикмахерскими и салонами красоты"
    //       },
    //       {
    //         Код:"96.04",
    //         Текст:"Деятельность физкультурно- оздоровительная"
    //       }],
    //       СПВЗ:
    //       [{
    //         Дата:"2018-09-05",
    //         Текст:"Представление сведений о регистрации юридического лица в качестве страхователя в территориальном органе Пенсионного фонда Российской Федерации"
    //       },
    //       {Дата:"2018-09-04",
    //       Текст:"Представление сведений о регистрации юридического лица в качестве страхователя в исполнительном органе Фонда социального страхования Российской Федерации"
    //     },
    //     {Дата:"2018-09-03",
    //     Текст:"Представление сведений об учете юридического лица в налоговом органе"
    //     },
    //     {Дата:"2018-09-03",
    //     Текст:"Создание юридического лица"
    //     }],
    //     ОткрСведения:
    //     {
    //       КолРаб:"1",
    //       СведСНР:"УСН",
    //       ПризнУчКГН:"Нет",
    //       Налоги:
    //       [{
    //         НаимНалог:"Страховые взносы на обязательное медицинское страхование работающего населения, зачисляемые в бюджет Федерального фонда обязательного медицинского страхования",СумУплНал:"4855.2"},
    //         {НаимНалог:"Страховые и другие взносы на обязательное пенсионное страхование, зачисляемые в Пенсионный фонд Российской Федерации",СумУплНал:"20944"},{НаимНалог:"Налог, взимаемый в связи с  применением упрощенной  системы налогообложения",СумУплНал:"0"},{НаимНалог:"Страховые взносы на обязательное социальное страхование на случай временной нетрудоспособности и в связи с материнством",СумУплНал:"2760.8"}],СумДоход:"731000",СумРасход:"781000",Дата:"2019-01-01"},История:{}}}]}



    data.layout = false

  //Отправляем ответ в браузер
  res.render('orglist', data)

});

module.exports = router;




