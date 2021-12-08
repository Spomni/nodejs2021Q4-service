import { IResponsable } from "./responsable.contract";
import { IStorable } from "./storable.contract";

export interface IModel extends IStorable, IResponsable {}