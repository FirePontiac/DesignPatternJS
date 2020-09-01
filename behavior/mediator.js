// Дизайн паттерн который в первую очередь позволяет выстраивать очень плотную коммуникацию между различными обьектами разного типа
// Представляет централизованный абстракцию которая помогает взаимодействовать группе обьектов через друг друга
// Создаём новых пользователей и подлючаем их к новому чату(к конкретной комнате и каждый пользователь сможет отправлять сообщения друг другу)
// А можно и через sockets
class User {
    constructor(name) {
        this.name = name
        this.room = null // room - переменная
    }
    send(message, to) { // 1 парам от кого принимаем это сообщение, 2 парам  - кому это сообщение отправляем
        this.room.send(message, this, to)  // У Room вызовем send куда будем передавать, От кого получаем в данном случае это this
        }
    receive(message, from) { // From - это обьект пользователь непосредственно
        console.log(`${from.name} => ${this.name}: ${message}`)
    }    
}

class ChatRoom {
    constructor() {
        this.users = {}
    }
    register(user) {
        this.users[user.name] = user
        user.room = this // Контекст this в данном случае указывает на класс ChatRoom
    } // Получается что от ChatRoom до текущей точки  - это и есть связка медиатора

    send(message, from, to) {
        if (to) {
            to.receive(message, from)
        } else { // если адресат не указан, то отправть сообщение всем пользователям в этой комнате кроме текущего
          Object.keys(this.users).forEach(key => {
              if (this.users[key] !== from) { // !== не равняется текущий параметру from, то есть не тукущай пользователь то 
                this.users[key].receive(message, from) // то пользователю на текущей итерации по ключу key вызываем метод receive
              }
          }) 
        }
    }
} // Это вся реализация медиатора

// Примеры работы
const Ivan = new User ('Ivan')
const Elena = new User ('Elena')
const igor = new User ('igor')

const room = new ChatRoom ()
room.register(Ivan)
room.register(Elena)
room.register(igor)

Ivan.send('Hi', Elena)
Elena.send('Hey', Ivan)
igor.send('Why', Elena)
Ivan.send('Когда на работу?') // Отправляет всем кроме себя
