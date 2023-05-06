interface IUsersReadDTO extends IReadDTO {
  name?: string;
  email?: string;
}
interface IUsersUpdateDTO extends IUpdateDTO {
  oldPassword: string;
}
