// Служит для создания более простой и уникальный интерфейс для взаимодействия с различными классами (публичный интерфейс упрощающий)
// Простой пример фасада библиотека jquery 
class Complaints { // Перевод - Жалобы
    constructor() {
        this.complaints = []
    }

    reply(compliant) { // метод

    }

    add(compliant) {
        this.complaints.push(compliant)
        return this.reply(compliant)
    }
}

class ProductComplaints extends Complaints { // Продуктовые жалобы
    reply({id, customer, details}) { // метод
        return `Product: ${id}: ${customer} (${details})`
    }
}

class ServiceComplaints extends Complaints { // Продуктовые жалобы
    reply({id, customer, details}) { // метод
        return `Service: ${id}: ${customer} (${details})`
    }
}

class ComplaintRegistry { // Это и есть Фасад, а весь код до него обычное наследование
    register(customer, type, details)  { // Прикол фасада как раз в том что тут можно привязывать кучу разлиных данных
        const id = Date.now() // Динамически создадим ID
        let compliant
        if (type === 'service') {
            compliant = new ServiceComplaints()
        } else {
            compliant = new ProductComplaints()
        }
        return compliant.add({id, customer, details})
    }
}

const registry = new ComplaintRegistry()
console.log(registry.register('Vlad', 'service', 'недоступен'))
console.log(registry.register('Elena', 'Product', 'Просрочка'))
// С помощью метода register и создаём разлиные жалобы, ComplaintRegistry и сколько бы небыло всё отрабатывает фасад
// Сам класс добавляет и метаданные и различные проверки, вызывае нужные методы, и определает к какому типу класса нужно отнести сей обьект
