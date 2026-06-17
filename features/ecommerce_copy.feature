Feature: E-commerce validation
  @logincheck
  Scenario Outline:  Login
    Given a login to web site with "<username>" and "<password>"

      Examples: 
      | username          | password  |
      | katie@email.com   | Password1 |
      | k@email.com       | passw     |
    | ksdasdadsa@email.com       | passw     |

