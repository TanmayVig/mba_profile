export enum RemarksEnum {
  NA = "NA",
  G = "G",
  B = "B",
  E = "E",
  H = "H",
}
export interface Restraunt {
  id: string;
  name: string;
  location: { latitude: number; longitude: number };
  link: string;
  remark: RemarksEnum;
}
export interface RestrauntList {
  restrauntsList: Restraunt[];
}

export interface RestrauntFormData {
  name: string;
  location: { latitude: number; longitude: number };
  link: string;
  remark: RemarksEnum;
}
