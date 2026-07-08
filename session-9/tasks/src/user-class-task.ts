enum UserRole {
    Admin = 'admin',
    Customer = 'customer',
}
class User {
    protected id: number;
    protected name: string;
    protected email: string;
    protected password: string;
    protected role: UserRole;
    constructor(id: number, name: string, email: string, password: string, role: UserRole) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    get userInfo(): string {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Role: ${this.role}`;
    }
    get userRole(): string {
        return `Role: ${this.role}`;
    }
    get userEmail(): string {
        return `Email: ${this.email}`;
    }
    get userPassword(): string {
        return `Password: ${this.password}`;
    }
    get userName(): string {
        return `Name: ${this.name}`;
    }
    get userId(): string {
        return `ID: ${this.id}`;
    }
    set userInfo(info: { id: number, name: string, email: string, password: string, role: UserRole }) {
        this.id = info.id;
        this.name = info.name;
        this.email = info.email;
        this.password = info.password;
        this.role = info.role;
    } 
    set userRole(role: UserRole) {
        this.role = role;
    }
    set userEmail(email: string) {
        this.email = email;
    }
    set userPassword(password: string) {
        this.password = password;
    }
    set userName(name: string) {
        this.name = name;
    }
    set userId(id: number) {
        this.id = id;
    }
    set userInfoFromString(info: string) {
        const [id, name, email, password, role] = info.split(',');
        this.id = parseInt(id ?? '');
        this.name = name ?? '';
        this.email = email ?? '';
        this.password = password ?? '';
        this.role = (role ?? 'customer') as UserRole;
    }
    login(email: string, password: string): boolean {
        return this.email === email && this.password === password;
    }
    register(name: string, email: string, password: string): void {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = UserRole.Admin;
    }
}

class customer extends User {
    constructor(id: number, name: string, email: string, password: string) {
        super(id, name, email, password, UserRole.Customer);
    }
    getCustomerInfo(): string {
        return super.userInfo;
    }
}

class admin extends User {
    constructor(id: number, name: string, email: string, password: string) {
        super(id, name, email, password, UserRole.Admin);
    }
    getAdminInfo(): string {
        return super.userInfo;
    }

    addCustomer(customer: customer): void {
        console.log(`Customer ${customer.userName} added by Admin ${this.userName}`);
    }

    removeCustomer(customer: customer): void {
        console.log(`Customer ${customer.userName} removed by Admin ${this.userName}`);
    }

    retrieveCustomerInfo(customer: customer): void {
        console.log(`Customer Info: ${customer.getCustomerInfo()}`);
    }

    retrieveAdminInfo(): void {
        console.log(`Admin Info: ${this.getAdminInfo()}`);
    }

    retrieveCustomerInfoById(customerId: number): void {
        console.log(`Retrieving customer info for ID: ${customerId}`);
    }

    retrieveAdminInfoById(adminId: number): void {
        console.log(`Retrieving admin info for ID: ${adminId}`);
    }
    
}   

