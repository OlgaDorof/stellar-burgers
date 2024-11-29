import * as fs from 'fs';
import { TIngredient } from '@utils-types';
import { deleteCookie, setCookie } from '../../src/utils/cookie';
type TResponse = {
  data: TIngredient[];
  success: boolean;
};

const mockToken = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

let mockIngredients: TResponse;
beforeEach(() => {
  cy.fixture('ingredients')
    .then((ingredients) => {
      mockIngredients = ingredients;
      cy.intercept('GET', `https://norma.nomoreparties.space/api/ingredients`, {
        statusCode: 200,
        body: mockIngredients
      });
    })
    .as('getIngredients');
  cy.visit('http://localhost:4000/');
  cy.wait('@getIngredients');
});

describe('Тестирование эндпоинта ingredients', () => {
  it('Проверка отображения булочек', () => {
    const bun = mockIngredients.data.filter(
      (ingredient) => ingredient.type === 'bun'
    ).length;
    cy.get('[data-ingredient-type = "bun"]').should('have.length', bun);
  });
  it('Проверка отображения основных ингридиентов', () => {
    const main = mockIngredients.data.filter(
      (ingredient) => ingredient.type === 'main'
    ).length;
    cy.get('[data-ingredient-type = "main"]').should('have.length', main);
  });
  it('Проверка отображения соуса', () => {
    const sauce = mockIngredients.data.filter(
      (ingredient) => ingredient.type === 'sauce'
    ).length;
    cy.get('[data-ingredient-type = "sauce"]').should('have.length', sauce);
  });
});

describe('Добавление ингридиента из списка в конструктор', () => {
  it('Проверка добавления булки', () => {
    cy.get('[data-bun-container]').contains('Выберите булки');
    cy.get(`li[data-ingredient-type = "bun"] button`).should('exist').click();
    cy.get('[data-bun-container]').within(() => {
      cy.get('.constructor-element').should('exist');
    });
  });
  it('Проверка добавления элементов бургера', () => {
    cy.get('[data-ingredient-container]').contains('Выберите начинку');
    cy.get(`li[data-ingredient-type = "main"] button`).should('exist').click();
    cy.get('[data-ingredient-container]').within(() => {
      cy.get('li').should('exist');
    });
  });
});

describe('Проверка работы модального окна у ингридиента', () => {
  it('Проверка открытия модального окна', () => {
    cy.get(`li[data-ingredient-type = "bun"] a`).click();
    cy.get('#modals h3').should('exist');
  });
  it('Проверка закрытия модального окна при клике на крестик', () => {
    cy.get(`li[data-ingredient-type = "bun"] a`).click();
    cy.get('#modals button[data-close-button]').click();
    cy.get('#modals h3').should('not.exist');
  });
});

describe('Проверка возможности создания заказа', () => {
  beforeEach(() => {
    // setCookie('accessToken', mockToken.accessToken);
    //   cy.setCookie('accessToken', mockToken.accessToken);
    //  localStorage.setItem('refreshToken', mockToken.refreshToken);
    cy.fixture('user')
      .then((user) => {
        cy.intercept('GET', `https://norma.nomoreparties.space/api/auth/user`, {
          statusCode: 200,
          body: user
        });
      })
      .as('getUser');
    cy.intercept(
      'POST',
      `https://norma.nomoreparties.space/api/orders`,
      (req) => {
        req.headers['authorization'] = `Bearer ${mockToken.accessToken}`;
        req.reply({ fixture: 'order.json' });
      }
    ).as('getOrder');
    cy.visit('http://localhost:4000/');
    cy.wait('@getUser');
    cy.get(`li[data-ingredient-type = "main"] button`).should('exist').click();
    cy.get(`li[data-ingredient-type = "bun"] button`).should('exist').click();
    cy.get('button[data-button-order]').click();
    cy.wait('@getOrder');
  });
  it('Проверка открытия модального окна c заказом', () => {
    cy.get('#modals h3').should('exist');
  });
  it('Проверка правильности отображения номера заказа', () => {
    cy.fixture('order.json').then((orderData) => {
      const orderNumber = orderData.order.number;
      cy.get('#modals h2').contains(orderNumber)
    });
  })
  it('Проверка закрытия модального окна', () => {
    cy.get('#modals button[data-close-button]').click();
    cy.get('#modals h3').should('not.exist');
  })
  it('После закрытия модального окна контейнер пуст', () => {
    cy.get('#modals button[data-close-button]').click();
    cy.get('[data-ingredient-container]').contains('Выберите начинку');
    cy.get('[data-bun-container]').contains('Выберите булки');
  })
  });

