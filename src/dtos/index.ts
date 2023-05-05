interface ICreateDTO {
  data: any;
}
interface IReadDTO {
  id?: string;
}
interface IUpdateDTO {
  id: string;
  data: any;
}
interface IDeleteDTO {
  id: string;
}
