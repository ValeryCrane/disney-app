# disney-app

React Native приложение, демонстрирующее информацию о персонажах Disney используя Disney API.

## Развертывание

```
npm install
npx expo start
```

## Что реализовано

- Показ и поиск персонажа
- Создание групп. Добавление/удаление персонажей в группах
- Комментирование персонажей
- Авторизация через почту и пароль
- Выход и удаление аккаунта
- Синхронизация с облаком Firestore
- Сохранение данных локально
- Поиск случайного персонажа
- Красивый лоадер с миккимаусом

## Что использовалось

- Для навигации @react-navigation/stack
- Для попапов @gorhom/bottom-sheet
- Для иконок @expo/vector-icons
- Для локального хранения @react-native-async-storage/async-storage
- Для хранения в облаке Firebase

## Возможно неинуитивное UI решение

<img src="https://user-images.githubusercontent.com/71835639/225730483-c7271ee5-485a-4578-a1d3-0bc5b8dd27ae.png" width=300>

Если нужно найти группу, то можно воспользоваться строкой поиска на попапе с группами. 
Если нужной группы не нашлось, можно ее добавить нажав на плюс справа от строки поиска.
     
