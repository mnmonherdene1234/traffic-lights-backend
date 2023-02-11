export default {
  virtuals: true,
  versionKey: false,
  transform(_doc: any, ret: any, _options: any) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
};
