import { User } from './../models/user.model';
import { UserInterface } from './../interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import data from './../../../data';

@Injectable()
export class UserService {
  private readonly users: UserInterface[] = [];
  private hasError = false;

  constructor() {
    this.getData();
  }

  create(user: UserInterface): void {
    this.users.push(user);
  }

  getData(): void {
    if (this.hasError) {
      return;
    }
    data.map((user: any) => this.create(this.formatRawApiData(user)));
  }

  formatRawApiData(dataElement: any): UserInterface {
    if (
      !dataElement.id ||
      !dataElement.nom ||
      !dataElement.prenom ||
      !dataElement.email
    ) {
      this.hasError = true;
    }
    const o = new User();
    o.id = parseInt(dataElement.id);
    o.nom = dataElement.nom;
    o.prenom = dataElement.prenom;
    o.email = dataElement.email;
    return o;
  }

  findAll(): UserInterface[] {
    return this.users;
  }

  findOne(id: number): UserInterface {
    return this.users.find((el) => el.id === id);
  }

  update(id: number, newUser: UserInterface): boolean {
    try {
      const itemToUpdateIndex = this.users.findIndex((el) => el.id === id);
      this.users[itemToUpdateIndex] = newUser;
      return true;
    } catch (e) {
      return false;
    }
  }

  delete(id: number): boolean {
    try {
      const itemToDeleteIndex = this.users.findIndex((el) => el.id === id);
      delete this.users[itemToDeleteIndex];
      return true;
    } catch (e) {
      return false;
    }
  }
}
