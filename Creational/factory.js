class SimpleMembership {
    constructor(name){
        this.name = name
        this.cost = 50
    }
}

class StandartMembership {
    constructor(name){
        this.name = name
        this.cost = 150
    }
}

class PremiumMembership {
    constructor(name){
        this.name = name
        this.cost = 500
    }
}

class MemberFactory {
    static list = { // list будет являться обьектом, static ключевое слово
        simple: SimpleMembership,
        standard: StandartMembership,
        Premium: PremiumMembership
    }
    // У данного класса Factory создаём метод create
    create (name, type = 'simple') { // Бедет создавать один из инстансов данного класса
        // Пишем сразу и большой так как туда будет записан класс, сперва к классу затем к списку и в конце к ключу Type
        const Membership = MemberFactory.list[type] || MemberFactory.list.simple // в случае есть type не нашёлся, то по умолчанию будет SimpleMembership
        const member = new Membership(name) // В данном случае этот конструктор будет являться тем классом которые входят в Factory (MemberFactory)
        // Плюсом такого подхода является гибкость в отношении кода, щас будем к примеру вносить изменения в переменную member
        member.type = type
        member.define = function() {
            console.log(`${this.name} (${this.type}): ${this.cost}`)
        }
        return member // Тем самым расширили функционал обьекта member 
    }
}

const factory = new MemberFactory()

const members = [
    factory.create('Valdilen', 'Simple'), // Создаём нового мембера и определённой подпиской и он сразу попадёт в массив
    factory.create('Elena', 'Premium'),
    factory.create('Vasilisa', 'Standard'),
// Добавим ещё 2х
    factory.create('Ivan', 'Premium'), // Если бы не было Factory кажды раз бы приходись писать New + отсылка к 34 строке, так теперь тоже можно
    factory.create('Petr')  
]
// console.log(members) // Проверять можно и не там, так как create возвращает обьект
members.forEach( m => {
    m.define()
})