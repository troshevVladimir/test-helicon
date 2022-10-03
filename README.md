Проблемы:
  Скачет контент из-за подгрузки Img (обычно решается заданием heigh, но тут в макете разные высоты картинок)
  Из-за разницы высот карточек они будут стоять в разнобой при большем количестве строк (решается
  .shop__product-card-wrapper {
    display: flex;
    align-items: stretch;
  }

  .product-card {
    display: flex;
    flex-direction: column;
  }

  .product-card__description {
    flex-grow: 1;
  })

Для запуска проекта `yarn && yarn start` в корневой директории