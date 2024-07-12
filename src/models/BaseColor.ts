import { ColorModel } from "./ColorModel"

export default abstract class BaseColor<Model extends ColorModel> {
    public abstract get model(): Model
}
