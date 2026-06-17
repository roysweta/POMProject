Feature: E-commerce validation

  Scenario: Placing the order
    Given a login to ecommerce site with "katie@email.com" and "Password1"
    When Add product namely "ZARA COAT 3" to the cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When enter valid details and place order
    Then verify order is present in order history