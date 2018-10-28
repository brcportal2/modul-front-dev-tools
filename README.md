# modul-front-dev-tools

Набор инструментов для разработки фронтенда. Включает в себя:

- [Встраиваемый конфиг eslint для Modul Style Guide](https://github.com/brcportal2/eslint-config-modul)
- Пакет [husky](https://www.npmjs.com/package/husky) для обработки гит-хуков
- Пакет [lint-staged](https://www.npmjs.com/package/lint-staged) для линтинга измнений при коммите
- Скрипт для запуска тестов при пуше

## Установка
```bash
yarn add ssh://git@github.com/brcportal2/modul-front-dev-tools
```
## Пример настройки обработки гит-хуков
.huskyrc:
```
{
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "modul-front-dev-tools-pre-push"
  }
}
```
## Скрипты
### pre-push.js

Запускает скрипт `test` из package.json, если пуш осуществляется в одну из заданных веток (по умолчанию - `master`, `rc` или `dev`). Список веток может быть задан через параметры командной строки, например:

```bash
modul-front-dev-tools-pre-push -b master -b rc -b webpack-dev
```
