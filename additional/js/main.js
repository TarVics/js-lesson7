/*
1. Створити клас або функцію конструктор, за допомоги якої можна створювати об'єкти наступного вигляду.
Конструктор повинен приймати значення для кожної властивості, в т.ч і для властивостей внутрішніх об'єктів

        {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            address: {
                street: 'Kulas Light',
                suite: 'Apt. 556',
                city: 'Gwenborough',
                zipcode: '92998-3874',
                geo: {
                    lat: '-37.3159',
                    lng: '81.1496'
                }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
                name: 'Romaguera-Crona',
                catchPhrase: 'Multi-layered client-server neural-net',
                bs: 'harness real-time e-markets'
            }
        }
*/

const User = function ({
                           id, name, username, email, addressStreet, addressSuite, addressCity, addressZipcode,
                           addressGeoLat, addressGeoLng, phone, website, companyName, companyCatchPhrase, companyBs
                       }) {

    if (!arguments.length || typeof arguments[0] !== 'object') return;
    if (!new.target) throw 'Constructor must be called with "new" operator';

    // Обов'язково створюються лише id, name, username. Всі інші поля будуть створені,
    // за умови, якщо вони задані у вхідних параметрах
    this.id = id;
    this.name = name;
    this.username = username;

    if (email) this.email = email;

    if (addressStreet || addressSuite || addressCity || addressZipcode || addressGeoLat || addressGeoLng) {
        this.address = {};
        if (addressStreet) this.address.street = addressStreet;
        if (addressSuite) this.address.suite = addressSuite;
        if (addressCity) this.address.city = addressCity;
        if (addressZipcode) this.address.zipcode = addressZipcode;
        if (addressGeoLat && addressGeoLng) {
            this.address.geo = {lat: '' + addressGeoLat, lng: '' + addressGeoLng}
        }
    }

    if (phone) this.phone = phone;
    if (website) this.website = website;

    if (companyName || companyCatchPhrase || companyBs) {
        this.company = {};
        if (companyName) this.company.name = companyName;
        if (companyCatchPhrase) this.company.catchPhrase = companyCatchPhrase;
        if (companyBs) this.company.bs = companyBs;
    }
}

const user = new User({
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    addressStreet: 'Kulas Light',
    addressSuite: 'Apt. 556',
    addressCity: 'Gwenborough',
    addressZipcode: '92998-3874',
    addressGeoLat: '-37.3159',
    addressGeoLng: '81.1496',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    companyName: 'Romaguera-Crona',
    companyCatchPhrase: 'Multi-layered client-server neural-net',
    companyBs: 'harness real-time e-markets'
});
console.log(user);

/********************************************************************/

/*

2. Створити функцію конструктор / клас який описує об'єкт тегу

     Поля :
     -назва тегу ()
     - опис його дій
     - масив з атрибутами (2-3 атрибути максимум)

    Кожен атрибут описати як окремий який буде містити

        -назву атрибуту
        -опис дії атрибуту
        інформацію брати з htmlbook.ru

    Таким чином описати теги

       -a
       -div
       -h1
       -span
       -input
       -form
       -option
       -select

    Приклад результуючого об'єкту

       {
            titleOfTag: 'area',
            action: `Каждый элемент <area> определяет активные области изображения, которые являются ссылками...`,
            attrs: [
            {titleOfAttr: 'accesskey', actionOfAttr: 'Переход к области с помощью комбинации клавиш'},
            {*some props and values*},
            {*...*},
            {*...*},
            ]
       }
*/

const Tag = function (title, action, attrs) {
    this.titleOfTag = title;
    this.action = action;
    this.attrs = [];
    if (!Array.isArray(attrs)) return;
    for (const attr of attrs) {
        if (typeof attr !== 'object') continue;
        const {title, action} = attr;
        if (!title) continue; // Без назви атрибуту, нема сенсу додавати опис
        const attrObj = {titleOfAttr: title}
        if (action) attrObj.actionOfAttr = action;
        this.attrs.push(attrObj);
    }
    this.info = function () {
        console.log('Тег "%s":', this.titleOfTag, this.action);
        for (const {titleOfAttr: title, actionOfAttr: action} of this.attrs) {
            console.log(' - "%s":', title, action);
        }
    }
}

const tagA = new Tag('a',
    'Створює гіперпосилання на іншу веб-сторінку, інтернет ресурс або файл',
    [
        {
            title: 'href',
            action: 'Вказує адресу документа, який слід перейти'
        },
        {
            title: 'target',
            action: 'Ім\'я вікна або кадру, куди браузер завантажуватиме документ'
        },
        {
            title: 'download',
            action: 'Пропонує завантажити вказаний за посиланням файл'
        }
    ]
);
const tagDiv = new Tag('div',
    'Групування елементів документа з метою зміни виду вмісту через стилі',
    [
        {
            title: 'align',
            action: 'Визначає вирівнювання вмісту'
        },
        {
            title: 'title',
            action: 'Додає спливаючу підказку до вмісту'
        }
    ]
);
const tagH1 = new Tag('h1',
    'Є найбільш важливим заголовком першого рівня',
    [
        {
            title: 'align',
            action: 'Визначає вирівнювання заголовка'
        },
        {
            title: 'class',
            action: 'Визначає ім\'я класу, що дозволяє пов\'язати тег із стильовим оформленням'
        }
    ]
);
const tagSpan = new Tag('span',
    'Групування елементів текстового рядка документа з метою зміни виду вмісту через стилі',
    [
        {
            title: 'class',
            action: 'Визначає ім\'я класу, що дозволяє пов\'язати тег із стильовим оформленням'
        },
        {
            title: 'id',
            action: 'Вказує ім\'я стильового ідентифікатора'
        }
    ]
);
const tagInput = new Tag('input',
    'Дозволяє створювати різні елементи інтерфейсу та забезпечити взаємодію з користувачем',
    [
        {
            title: 'type',
            action: 'Повідомляє браузер, до якого типу відноситься елемент форми'
        },
        {
            title: 'value',
            action: 'Значення елемента'
        },
        {
            title: 'name',
            action: 'Ім\'я поля призначене для того, щоб обробник форми міг його ідентифікувати'
        }
    ]
);
const tagForm = new Tag('form',
    'встановлює форму на веб-сторінці, яка призначена для обміну даними між користувачем та сервером',
    [
        {
            title: 'action',
            action: 'Адреса програми або документа, що обробляє дані форми'
        },
        {
            title: 'name',
            action: 'Назва форми'
        },
        {
            title: 'autocomplete',
            action: 'Вмикає автозаповнення полів форми'
        }
    ]
);
const tagOption = new Tag('option',
    'Визначає окремі пункти списку, який створюється за допомогою контейнера <select>',
    [
        {
            title: 'label',
            action: 'Вказує позначку пункту списку'
        },
        {
            title: 'selected',
            action: 'Заздалегідь встановлює певний пункт списку виділеним'
        },
        {
            title: 'value',
            action: 'Значення пункту списку, яке буде надіслано на сервер або прочитано за допомогою скриптів'
        }
    ]
);
const tagSelect = new Tag('select',
    'Елемент інтерфейсу у вигляді списку, що розкривається, а також список з одним або множинним вибором',
    [
        {
            title: 'form',
            action: 'Пов\'язує список із формою'
        },
        {
            title: 'multiple',
            action: 'Дозволяє одночасно вибирати одразу кілька елементів списку'
        },
        {
            title: 'name',
            action: 'Ім\'я елемента для надсилання на сервер або звернення через скрипти'
        }
    ]
);

tagA.info();
tagDiv.info();
tagH1.info();
tagSpan.info();
tagInput.info();
tagForm.info();
tagOption.info();
tagSelect.info();
