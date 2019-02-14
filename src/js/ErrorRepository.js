/**
 *  Класс хранения описания ошибок
 * @param {Array} errors Массив ошибок.
 */

class ErrorRepository {
  constructor(errors) {
    this.errors = new Map(errors);
  }

  /**
 * Метод получения описания ошибки по коду.
 * При остутствии кода в перечне вернет строку 'Unknown error'
 * @param {Numder} code Код ошибки
 */

  getError(code) {
    return this.errors.has(code) ? this.errors.get(code) : 'Unknown error';
  }

  /**
 *  Метод добавления кода и описания ошибки
 * @param {Numder}  code Код ошибки
 * @param {String}  description Описание ошибки
 *
 * @throws при дублировании кода будет сгенерирована ошибка
 */

  addError(code, description) {
    if (this.errors.has(code)) throw new Error('Данный код уже используется');

    this.errors.set(code, description);
  }

  /**
 * Геттер для получения количества ошибок в хранилище.
 *
 */

  get size() {
    return this.errors.size;
  }
}

export default ErrorRepository;
