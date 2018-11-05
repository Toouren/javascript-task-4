'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {

        events: new Map(),

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {this}
         */
        on: function (event, context, handler) {
            const events = this.events;
            if (typeof events[event] === 'undefined') {
                events[event] = [];
            }

            events[event].push({ context, handler });
            this.events = events;

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {this}
         */
        off: function (event, context) {
            const events = this.events;
            Object.keys(events).forEach(eventName => {
                if (eventName === event || eventName.startsWith(`${event}.`)) {
                    events[eventName] = events[eventName].filter(sub =>{
                        return sub.context !== context;
                    });
                }
            });
            this.events = events;

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {this}
         */
        emit: function (event) {
            const events = this.events;
            if (typeof events[event] !== 'undefined') {
                events[event].forEach(sub => {
                    sub.handler.apply(sub.context);
                });
            }

            if (event.lastIndexOf('.') !== -1) {
                this.emit(event.substring(0, event.lastIndexOf('.')));
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
