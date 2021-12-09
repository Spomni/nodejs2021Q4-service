import { IModel } from "../model.contract";

export interface IUserToCreate {
  id?: string,
  name: string,
  login: string,
  password: string,
}

export interface IUserToStore {
  id: string,
  name: string,
  login: string,
  password: string,
}

export interface IUserToSend {
  id: string,
  name: string,
  login: string,
}

export interface IUserModel extends IModel<IUserToStore, IUserToSend> {
  id: string,
  name: string,
  login: string,
  password: string,
}