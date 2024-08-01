import { UUID } from "crypto";

export class User {
  constructor(public id: UUID, public email: string, public password: string) { }
}
