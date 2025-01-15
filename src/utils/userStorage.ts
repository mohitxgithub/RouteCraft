interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
  }
  
  class UserStorage {
    private users: User[] = [];
  
    addUser(user: User): void {
      this.users.push(user);
    }
  
    findUserByEmail(email: string): User | undefined {
      return this.users.find(user => user.email === email);
    }
  
    findUserById(id: string): User | undefined {
      return this.users.find(user => user.id === id);
    }
  }
  
  export const userStorage = new UserStorage();
  
  