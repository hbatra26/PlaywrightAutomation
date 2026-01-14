export class LoginPage
{
constructor(page)   
{
this.page=page;
this.signInButton = page.getByRole('button', { name: 'login' });
this.username = page.getByPlaceholder("email@example.com");
this.password = page.getByPlaceholder("enter your passsword");
}

async validlogin(username,password)
{
await this.username.fill(username);
await this.password.fill(password);
await this.signInButton.click();
}

async goto()
{
await this.page.goto("https://rahulshettyacademy.com/client/");  
}
}

