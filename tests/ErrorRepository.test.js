import ErrorRepository from '../src/js/ErrorRepository';

const errors = [
  [102, 'Запрос принят, но на его обработку понадобится длительное время'],
  [200, 'Успешный запрос'],
  [201, 'B результате успешного выполнения запроса был создан новый ресурс'],
  [202, 'Запрос был принят на обработку, но она не завершена'],
  [400, 'Cервер обнаружил в запросе клиента синтаксическую ошибку'],
];

test('Создается объект класса ErrorRepositiry', () => {
  const errBase = new ErrorRepository(errors);

  expect(errBase instanceof ErrorRepository).toBeTruthy();
  expect(errBase.size).toBe(5);
});

test('Метод getError возвращает описание по коду ошибки', () => {
  const errBase = new ErrorRepository(errors);
  const err200 = errBase.getError(200);

  expect(err200).toBe('Успешный запрос');
});

test('Метод getError возвращает Unknown error для отсутствуеющего в базе кода', () => {
  const errBase = new ErrorRepository(errors);
  const errUnknown = errBase.getError(404);

  expect(errUnknown).toBe('Unknown error');
});

test('Метод addError добавляет описание новой ошибки', () => {
  const errBase = new ErrorRepository(errors);
  errBase.addError(123, 'new Error');

  expect(errBase.getError(123)).toBe('new Error');
});

test('Метод addError не добавляет ошибку с существующим кодом и генерирует ошибку', () => {
  const errBase = new ErrorRepository(errors);
  const { size } = errBase;

  try {
    errBase.addError(200, 'Успешный запрос');
  } catch (e) {
    expect(e).toEqual(Error('Данный код уже используется'));
  }
  expect(errBase.size).toBe(size);
});
