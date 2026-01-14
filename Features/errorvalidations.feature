Feature: Ecommerce Validation
  This feature tests the ecommerce functionalities including product search, adding to cart, and checkout process.

@Validation
Scenario Outline: Login to ecommerce2 site with invalid password  
Given the user enters username "<Username>" and password "<Password>"
Then verify error message is displayed

Examples:
    | Username     | Password | 
    | rahulshetty  | Pass@12  |
    | xyz          | 12345    |