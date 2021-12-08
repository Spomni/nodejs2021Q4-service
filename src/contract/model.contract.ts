import { IResponsable } from "./responsable.contract";
import { IStorable } from "./storable.contract";

export interface IModel<TIModel>
  extends IStorable<TIModel>, IResponsable<TIModel>
{}