// Позволяет ставит ловушки на поля обьектов, на вызов функции, позволяет  очень гибко управлять приложением
// Например, избавление от лишних запросов на сервер 
function networkFetch(url) {
    return `${url} - ответ с сервера`
}
const cache = new Set () // St это структура данных, в которую мы можем записывать данные, но которые не будут пповторяться
const proxedFetch = new Proxy (networkFetch, { // Тут главное не вызывать этот метод
    apply (target, thisArg, args) {
        const url = args[0]
        if (cache.has(url)) { // Если есть уже в кеше URL то :
            return `${url} - Ответ из Кеша`
        } else { // если в кеше нету URL
            cache.add(url) // то добавить и запусть метод networkFetch
            return Reflect.apply(target, thisArg, args) // Универсальный способ, так как мы тут работаем и с контекстом и с аргументами, поэтому можно обрабатывать любую функцию

        }
    }
})

console.log(proxedFetch('angular.io'))
console.log(proxedFetch('react.io'))
console.log(proxedFetch('angular.io')) // а тут уже не ходим на удалённый сервер а кеш только, очень экономит время для работы приложения
