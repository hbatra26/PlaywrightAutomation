Feature: Ecommerce Validation
  This feature tests the ecommerce functionalities including product search, adding to cart, and checkout process.

@Regression
Scenario: Login to ecommerce site
        Given the user enters username "anshika@gmail.com" and password "Pass@123" on login page
        When the user searches and adds "ADIDAS ORIGINAL" to the cart
        Then verify the product "ADIDAS ORIGINAL" is displayed in the cart
        When the user proceeds to checkout and places the order with country "India" and partial name "Ind"
        Then verify the order is placed successfully and navigates to orders
        When the user searches for the placed order and view the order details
        Then verify order details are displayed correctly
   
@Validation

Scenario Outline: Login to ecommerce2 site with invalid password  
Given the user enters username "<Username>" and password "<Password>"
Then verify error message is displayed

Examples:
    | Username     | Password | 
    | rahulshetty  | Pass@12  |
    | xyz          | 12345    |       