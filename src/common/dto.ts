export class FindAllDto {
  filter: any = {};
  page: number = 1;
  pageSize: number = 20;
  total: number = 0;
  populate: string = "";
  sort: string = "";
  select: string = "";
}

export class FindAllResultDto<T> {
  data: T[] = [];
  meta: FindAllDto = new FindAllDto();
}

export class FindOneDto {
  id: string = "";
  populate: string = "";
  select: string = "";
}
