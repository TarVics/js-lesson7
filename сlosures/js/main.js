/*

1) Створити карту користувача(User Card):

    Створити функцію «userCard» яка приймає число(будь-яке число) і повертає об’єкт з методами:

    const card3 = userCard(3); // returns an object with methods

    User Card методи:

    - getCardOptions. Дана функція повертає об’єкт котрий містить інформацію про карту:

          card3.getCardOptions(); // returns options object with card info

      Об’єкт має містити такі властивості:

      - balance (по замовчуванням 100) 
      - transactionLimit (по замовчуванню 100. Це ліміт коштів які ви можете взяти з карти)
      - historyLogs (масив об'єктів який містить інформацію про операції та трансакції даної карти)
      - key (число в діапазоні[1; 3] залежить від числа яке ви передали в userCard функції. Кожна карта повинна мати унікальний key)
 
    - putCredits. Ця функція отримує певну кількість грошей і заповнює баланс карти:

          card3.putCredits(150);

    - takeCredits. Ця функція отримує певну кількість грошей і віднімає ці кошти з балансу карти (протилежний за дією від методу putCredits):

          card3.takeCredits(100);

        Ви можете брати кошти з картки, якщо ліміт транзакцій та залишок коштів
        перевищують кількість коштів, які ви бажаєте взяти. Якщо ні, то слід записати
        відповідне повідомлення у консолі (скористайтеся console.error)

    - setTransactionLimit.Ця функція приймає як аргумент число і встановлює його як ліміт транзакцій на картці 

          card3.setTransactionLimit(5000);

    - transferCredits. Ця функція отримує два аргументи - кількість кредитів, які потрібно передати, та карту одержувача (інший об’єкт, створений функцією `userCard` - card1):

          card3.transferCredits(50, card1);

    Кошти, які ви хочете передати, повинні обкладатися податками 0,5%. 
    Не забудьте перед перерахуванням перевірити залишок балансу та ліміт
    транзакцій відправника кредитів (card3).

    Ви повинні відстежувати тільки Put credits/Take credits/Transaction limit
    change операції та зберігайте history log. History log (Дивитись зображення 1)
    інформація має зберігатись в об'єктах з такими властивостями:
    - operationType (стрічка яка описує здійснену операцію)
    - credits (кількість коштів)
    - operationTime (формат: "27/07/2018, 03:24:53". Час коли була здійснена операція)
      Зображення 1 — Приклад виклику функції getCardOptions


2) Створити UserAccount:

    Створити клас `UserAccount` (для цього завдання можна використати ES6 клас або звичайну функцію):
    
       const user = new UserAccount('Bob');

    Клас має містити:

    - Властивості акаунту користувача:
      - name (передати в конструкторі)
      - cards (Масив карток користувача. Масив не має бути довшим ніж 3)
    - Методи акаунту користувача:
      - addCard. Створює нову карту (використовуйте ‘userCard’ функцію) та додайте її до cards:

            user.addCard();
      
        Користувач повинен мати <= 3 карти.
      - getCardByKey. Приймає число в діапазоні {1; 3} і повертає об’єкт карти

            / *
             * Повертає об’єкт {
             * key: 1,
             * balance: 150,
             * ...other card properties
             * }
             * /
            user.getCardByKey(1);

    Код

       Приклад переказу коштів:
       let user = new UserAccount('Bob');
       user.addCard()
       user.addCard()
       let card1 = user.getCardByKey(1);
       let card2 = user.getCardByKey(2);
       card1.putCredits(500);
       card1.setTransactionLimit(800);
       card1.transferCredits(300, card2);
       card2.takeCredits(50);
       console.log(card1.getCardOptions()); // див зображення 2
       Зображення 2 - Об’єкт властивостей card1
       console.log(card2.getCardOptions()); // див зображення 3
       Зображення 3 - Об’єкт властивостей card2

Посилання
- https://css-tricks.com/javascript-scope-closures/
- https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Classes
*/

/********************************************************************/
// 1) Створити карту користувача(User Card)
/********************************************************************/
const userCard = function (cardKey) {
    const key = +cardKey;
    if (isNaN(key) || key < 1 || key > 3) {
        console.error('%s. Key values are allowed within [1-3]:', 'Card creation', cardKey);
        return;
    }

    let balance = 100;
    let transactionLimit = 100;
    const historyLogs = [];
    const putHistory = function (operationType, credits) {
        const operationTime = new Date().toLocaleString('en-GB');
        historyLogs.push(
            {
                operationType,
                credits,
                operationTime
            }
        );
        console.log('#%s. %s: %s. Credits', key, operationTime, operationType, credits);
    }

    return {
        getCardOptions () {
            return {
                key,
                balance,
                transactionLimit,
                // З метою уникнення передачі вказівників на масив історії та його об'єкти, передамо його копію
                historyLogs: historyLogs.map(val => ({
                    operationType: val.operationType,
                    credits: val.credits,
                    operationTime: val.operationTime
                }))
            }
        },
        putCredits (amount) {
            const opName = 'Received credits';
            const value = +amount;
            if (isNaN(value) || value <= 0) {
                console.error('%s. Only positive values are allowed:', opName, amount);
                return false;
            }
            balance += value;
            putHistory(opName, value);
            return true;
        },
        takeCredits (amount) {
            const opName = 'Withdrawal of credits';
            const value = +amount;
            if (isNaN(value) || value <= 0) {
                console.error('%s. Only positive values are allowed:', opName, amount);
                return false;
            }
            if (value > balance) {
                console.error('%s. The withdrawal amount exceeds the balance', opName);
                return false;
            }
            if (value > transactionLimit) {
                console.error('%s. The withdrawal amount exceeds the transaction limit', opName);
                return false;
            }
            balance -= value;
            putHistory(opName, value);
            return true;
        },
        setTransactionLimit (amount) {
            const opName = 'Transaction limit change';
            const value = +amount;
            if (isNaN(value) || value < 0) {
                console.error('%s. Only positive or zero values are allowed:', opName, amount);
                return false;
            }
            transactionLimit = value;
            putHistory(opName, value);
            return true;
        },
        transferCredits (amount, card) {
            const opName = 'Transfer of credits';
            let value = +amount;
            if (isNaN(value) || value <= 0) {
                console.error('%s. Only positive values are allowed:', opName, amount);
                return false;
            }
            if (typeof card !== 'object' || typeof card.putCredits !== 'function') {
                console.error('%s. Invalid destination card for transfer:', opName, amount);
                return false;
            }

            // Кошти, які ви хочете передати, повинні обкладатися податками 0,5%
            let totalValue = value + value * 0.5 / 100 /* +Taxes */;

            if (!this.takeCredits(totalValue)) return false;

            if (!card.putCredits(value)) {
                this.putCredits(totalValue);
                return false;
            }

            return true;
        }
    }
}
const writeOps = function (card, emptyRow = true) {
    const ops = card.getCardOptions();
    console.log('#%d.', ops.key, ops);
    if (emptyRow) console.log(' ');
}
const takeCredits = function (card, amount, writeInfo = true) {
    const ops = card.getCardOptions();
    console.log('#%d. Take credits:', ops.key, amount);
    card.takeCredits(amount);
    if (writeInfo) writeOps(card);
}
const putCredits = function (card, amount, writeInfo = true) {
    const ops = card.getCardOptions();
    console.log('#%d. Put credits:', ops.key, amount);
    card.putCredits(amount);
    if (writeInfo) writeOps(card);
}
const setTransactionLimit = function (card, amount, writeInfo = true) {
    const ops = card.getCardOptions();
    console.log('#%d. Set transaction limit:', ops.key, amount);
    card.setTransactionLimit(amount);
    if (writeInfo) writeOps(card);
}
const transferCredits = function (srcCard, dstCard, amount, writeInfo = true) {
    const srcOps = srcCard.getCardOptions();
    const dstOps = dstCard.getCardOptions();
    console.log('#%d -> #%d. Transfer credits:', srcOps.key, dstOps.key, amount);
    srcCard.transferCredits(amount, dstCard);
    if (writeInfo) {
        console.log(' ')
        writeOps(dstCard, false);
        writeOps(srcCard);
    }
}

const card4 = userCard(1); // returns an object with methods
writeOps(card4, false);

const card3 = userCard(3); // returns an object with methods
writeOps(card3);

takeCredits(card3, 150);
putCredits(card3, 150);
takeCredits(card3, 150);
takeCredits(card3, 100);
setTransactionLimit(card3, 5000);

transferCredits(card3, card4, 50);

/********************************************************************/
// 2) Створити UserAccount
/********************************************************************/

const UserAccount = function (name) {
    const cards = []; // Прихована змінна для обмеження кількості. Пошук карт - через getCardByKey
    this.name = name;
    this.addCard = function () {
        if (cards.length >= 3) {
            console.error('Exceeded card count limit: 3');
            return null;
        }
        const card = userCard(cards.length + 1);
        cards.push(card);
        return card;
    }
    this.getCardByKey = function (key) {
        return cards.find(card => card.getCardOptions().key === key) || null;
    }
}

console.log('*********************************************')
console.log(' ')

// Приклад переказу коштів:
let user = new UserAccount('Bob');

user.addCard();
user.addCard();

let card1 = user.getCardByKey(1);
let card2 = user.getCardByKey(2);

writeOps(card1, false);
writeOps(card2);

putCredits(card1, 500, false);
setTransactionLimit(card1, 800, false);
transferCredits(card1, card2, 300, false);
takeCredits(card2, 50, false);
console.log(' ')
writeOps(card1, false);
writeOps(card2);
